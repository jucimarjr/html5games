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
    if (Server.prototype.instance) {
        return Server.prototype.instance;
    }
    this.socketMap = new Dictionary();
    this.userList = new List();
    this.roomList = new List();
    this.socket = new ServerSocket();
    Server.prototype.instance = this;
    this.addRooms();
};
Server.prototype = {
    addRooms: function () {
        'use strict';
        var i,
            server = new Server();
        for (i = 0; i < Config.NUMBER_ROOMS; i = i + 1) {
            server.roomList.add(new Room(i, new List(), Config.ROOM_CAPACITY));
        }
    },
    start: function (port) {
        'use strict';
        var server = new Server();
        server.socket = server.socket.listen(port);
        server.socket.on(EmitEvents.CONNECTION, server.onSocketConnection);
    },
    onSocketConnection: function (socketClient) {
        'use strict';
        var server = new Server(),
            pack = { id: socketClient.id };
        server.socket.to(socketClient.id).emit(EmitEvents.SERVER_SEND_ID, JSON.stringify(pack));
        socketClient.on(EmitEvents.CLIENT_SEND_LOGIN, function (json) { server.onLoginReceived(json, socketClient); });
        socketClient.on(EmitEvents.CLIENT_REQUEST_ROOMS_INFO, server.sendRoomsInfo);
        socketClient.on(EmitEvents.CLIENT_REQUEST_ENTER_ROOM, server.answerEnterRoom);
        socketClient.on(EmitEvents.CLIENT_REQUEST_EXIT_ROOM, server.answerExitRoom);
        return;
    },
    onLoginReceived: function (json, socketClient) {
        'use strict';
        var pack = JSON.parse(json),
            server = new Server(),
            user = new User(pack.id, pack.login);
        server.socketMap.add(user.login, socketClient);
        server.userList.add(user);
        server.socket.to(user.id).emit(EmitEvents.SERVER_ACK_LOGIN);
    },
    sendRoomsInfo: function (identifier) {
        'use strict';
        var server = new Server(),
            pack = { roomList: server.roomList },
            emitter = server.socket;
        if (identifier) {
            emitter = emitter.to(identifier);
        }
        emitter.emit(EmitEvents.SERVER_SEND_ROOMS_INFO, JSON.stringify(pack));
    },
    answerEnterRoom: function (json) {
        'use strict';
        var user,
            pack = JSON.parse(json),
            number = pack.roomNumber,
            id = pack.id,
            login = pack.login,
            server = new Server(),
            room = server.roomList.query('number', number);
        pack = { answer: false, roomNumber: null };
        if (!room.isFull()) {
            user = server.userList.query('login', login);
            room.userList.add(user);
            server.socketMap.get(user.login).join(room.number);
            user.roomNumber = room.number;
            pack.answer = true;
            pack.roomNumber = room.number;
        }
        server.socket.to(id).emit(EmitEvents.SERVER_ANSWER_ENTER_ROOM, JSON.stringify(pack));
        server.sendRoomsInfo();
    },
    answerExitRoom: function (json) {
        'use strict';
        var pack = JSON.parse(json),
            id = pack.id,
            login = pack.login,
            server = new Server(),
            user = server.userList.query('login', login),
            room;
        room = server.roomList.query('number', user.roomNumber);
        room.userList.remove(room.userList.indexOf(user));
        server.socketMap.get(user.login).leave(room.number);
        user.roomNumber = null;
        pack = { answer: true };
        server.socket.to(id).emit(EmitEvents.SERVER_ANSWER_EXIT_ROOM, JSON.stringify(pack));
        server.sendRoomsInfo();
    }
};

module.exports = Server;