/*global module, require, console*/

var Config = require("./config.js");
var List = require(Config.PATH_LIST);
var User = require(Config.PATH_USER);
var ServerSocket = require(Config.PATH_SOCKETIO);
var EmitEvents = require(Config.PATH_EMIT_EVENTS);
var Room = require(Config.PATH_ROOM);
var Dictionary = require(Config.PATH_DICTIONARY);

/* This object is used to communicate with the users, it is a singleton */

var Server = function () {
    'use strict';
    this.socketMap = new Dictionary();
    this.userList = new List();
    this.roomList = new List();
    this.socket = new ServerSocket();
    this.addRooms();
};
Server.prototype = {
    addRooms: function () {
        'use strict';
        var i;
        for (i = 0; i < Config.NUMBER_ROOMS; i = i + 1) {
            this.roomList.add(new Room(i, new List(), Config.ROOM_CAPACITY));
        }
    },
    start: function (port) {
        'use strict';
        this.socket = this.socket.listen(port);
        this.socket.on(EmitEvents.CONNECTION, this.onSocketConnection.bind(this));
    },
    onSocketConnection: function (socketClient) {
        'use strict';
        this.socket.to(socketClient.id).emit(EmitEvents.SERVER_SEND_ID, JSON.stringify(socketClient.id));
        socketClient.on(EmitEvents.CLIENT_SEND_LOGIN, function (json) { this.onLoginReceived(json, socketClient); }.bind(this));
        socketClient.on(EmitEvents.CLIENT_REQUEST_ROOMS_INFO, this.sendRoomsInfo.bind(this));
        socketClient.on(EmitEvents.CLIENT_REQUEST_ENTER_ROOM, this.replyEnterRoom.bind(this));
        socketClient.on(EmitEvents.CLIENT_REQUEST_EXIT_ROOM, this.replyExitRoom.bind(this));
        return;
    },
    onLoginReceived: function (json, socketClient) {
        'use strict';
        var received = JSON.parse(json),
            user = new User(received.id, received.login);
        this.socketMap.add(user.login, socketClient);
        this.userList.add(user);
        this.socket.to(user.id).emit(EmitEvents.SERVER_ACK_LOGIN);
    },
    sendRoomsInfo: function (identifier) {
        'use strict';
        this.socket.to(identifier).emit(EmitEvents.SERVER_SEND_ROOMS_INFO, JSON.stringify(this.roomList));
    },
    replyEnterRoom: function (json) {
        'use strict';
        var received = JSON.parse(json),
            room = this.roomList.query('number', received.roomNumber),
            user = this.userList.query('login', received.user.login);
        if (room.isFull()) {
            this.socket.to(user.id).emit(EmitEvents.SERVER_DENY_ENTER_ROOM);
            return;
        }
        room.userList.add(user);
        this.socketMap.get(user.login).join(room.number);
        user.roomNumber = room.number;
        this.socket.to(user.id).emit(EmitEvents.SERVER_ALLOW_ENTER_ROOM);
        this.socket.emit(EmitEvents.SERVER_SEND_ROOMS_INFO, JSON.stringify(this.roomList));
    },
    replyExitRoom: function (json) {
        'use strict';
        var received = JSON.parse(json),
            user = this.userList.query('login', received.login),
            room;
        room = this.roomList.query('number', user.roomNumber);
        room.userList.remove(room.userList.indexOf(user));
        this.socketMap.get(user.login).leave(room.number);
        user.roomNumber = null;
        this.socket.to(user.id).emit(EmitEvents.SERVER_ACK_EXIT_ROOM);
        this.socket.emit(EmitEvents.SERVER_SEND_ROOMS_INFO, JSON.stringify(this.roomList));
    }
};

module.exports = Server;