/*global module, require, console*/

var Config = require("./config.js");
var List = require(Config.PATH_LIST);
var User = require(Config.PATH_USER);
var ServerSocket = require(Config.PATH_SOCKETIO);
var EmitEvents = require(Config.PATH_EMIT_EVENTS);
var Room = require(Config.PATH_ROOM);
var Dictionary = require(Config.PATH_DICTIONARY);
var Utils = require(Config.PATH_UTILS);

/* This object is used to communicate with the users */

var Server = function () {
    "use strict";
    this.socketMap = new Dictionary();
    this.userList = new List();
    this.roomList = new List();
    this.socket = new ServerSocket();
    this.addRooms();
};
Server.prototype = {
    addRooms: function () {
        "use strict";
        var i;
        for (i = 0; i < Config.NUMBER_ROOMS; i = i + 1) {
            this.roomList.add(new Room(i, new List(), Config.ROOM_CAPACITY));
        }
    },
    removeFromRoom: function (user) {
        "use strict";
        var index,
            room = this.roomList.query("number", user.roomNumber);
        if (room !== null && room.userList.contains("login", user.login)) {
            index = room.userList.indexOf(user);
            room.userList.remove(index);
            this.socketMap.get(user.login).leave(room.number);
            user.roomNumber = null;
        }
    },
    addToRoom: function (user, roomNumber) {
        "use strict";
        var room = this.roomList.query("number", roomNumber);
        room.userList.add(user);
        this.socketMap.get(user.login).join(room.number);
        user.roomNumber = room.number;
    },
    eraseUser: function (login) {
        "use strict";
        var user = this.userList.query("login", login);
        if (user !== null) {
            this.removeFromRoom(user);
            this.userList.remove(this.userList.indexOf(user));
            this.socketMap.get(user.login).disconnect();
            this.socketMap.remove(user.login);
        }
    },
    start: function (port) {
        "use strict";
        this.socket = this.socket.listen(port);
        this.socket.on(EmitEvents.CONNECTION, this.onSocketConnection.bind(this));
    },
    onSocketConnection: function (socketClient) {
        "use strict";
        this.socket.to(socketClient.id).emit(EmitEvents.SERVER_SEND_ID, JSON.stringify(socketClient.id));
        socketClient.on(EmitEvents.CLIENT_SEND_LOGIN, function (json) { this.onLoginReceived(json, socketClient); }.bind(this));
        socketClient.on(EmitEvents.CLIENT_REQUEST_ROOMS_INFO, this.sendRoomsInfo.bind(this));
        socketClient.on(EmitEvents.CLIENT_REQUEST_ENTER_ROOM, this.replyEnterRoom.bind(this));
        socketClient.on(EmitEvents.CLIENT_REQUEST_EXIT_ROOM, this.replyExitRoom.bind(this));
        socketClient.on(EmitEvents.CLIENT_REQUEST_DISCONNECTION, this.disconnect.bind(this));
        socketClient.on(EmitEvents.CLIENT_REQUEST_TEAMS, this.sendTeams.bind(this));
        socketClient.on(EmitEvents.DISCONNECTION, function () { this.onLoseConnection(socketClient.id); }.bind(this));
        return;
    },
    onLoginReceived: function (json, socketClient) {
        "use strict";
        var received = JSON.parse(json),
            user = new User(received.id, received.login, received.roomNumber);
        this.eraseUser(user.login);
        this.userList.add(user);
        this.socketMap.add(user.login, socketClient);
        if (user.roomNumber !== null && user.roomNumber !== undefined) {
            this.addToRoom(user, user.roomNumber);
        }
        this.socket.to(user.id).emit(EmitEvents.SERVER_ACK_LOGIN);
    },
    sendRoomsInfo: function () {
        "use strict";
        this.socket.emit(EmitEvents.SERVER_SEND_ROOMS_INFO, JSON.stringify(this.roomList));
        this.allowOrNotGame();
    },
    replyEnterRoom: function (json) {
        "use strict";
        var received = JSON.parse(json),
            room = this.roomList.query("number", received.roomNumber),
            user = this.userList.query("login", received.user.login);
        if (room.isFull()) {
            this.socket.to(user.id).emit(EmitEvents.SERVER_DENY_ENTER_ROOM);
            return;
        }
        this.addToRoom(user, room.number);
        this.socket.to(user.id).emit(EmitEvents.SERVER_ALLOW_ENTER_ROOM, room.number);
        this.sendRoomsInfo();
    },
    replyExitRoom: function (json) {
        "use strict";
        var received = JSON.parse(json),
            user = this.userList.query("login", received.login);
        this.removeFromRoom(user);
        this.socket.to(user.id).emit(EmitEvents.SERVER_ACK_EXIT_ROOM);
        this.sendRoomsInfo();
    },
    disconnect: function (json) {
        "use strict";
        var received = JSON.parse(json),
            user = this.userList.query("login", received.login);
        this.eraseUser(user.login);
    },
    onLoseConnection: function (id) {
        "use strict";
        var user = this.userList.query("id", id);
        if (user !== null) {
            this.eraseUser(user.login);
            this.sendRoomsInfo();
        }
    },
    allowOrNotGame: function () {
        "use strict";
        var i, room;
        for (i = 0; i < this.roomList.count; i = i + 1) {
            room = this.roomList.get(i);
            if (room.isFull()) {
                this.socket.to(room.number).emit(EmitEvents.SERVER_ALLOW_GAME);
            } else {
                this.socket.to(room.number).emit(EmitEvents.SERVER_DISALLOW_GAME);
            }
        }
    },
    formTeams: function (room) {
        "use strict";
        var i;
        for (i = 0; i < room.userList.count; i = i + 2) {
            room.userList.get(i).pair = room.userList.get(i + 1).login;
            room.userList.get(i + 1).pair = room.userList.get(i).login;
        }
    },
    sendTeams: function (id) {
        "use strict";
        var user = this.userList.query("id", id),
            room = this.roomList.get(user.roomNumber);
        if (room.isFull()) {
            this.formTeams(room);
            this.socket.to(id).emit(EmitEvents.SERVER_SEND_TEAMS, JSON.stringify(room.userList));
        }
    }
};

module.exports = Server;