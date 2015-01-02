/*global module, require, console*/

var Config = require("./config.js");
var List = require(Config.PATH_LIST);
var User = require(Config.PATH_USER);
var ServerSocket = require(Config.PATH_SOCKETIO);
var EmitEvents = require(Config.PATH_EMIT_EVENTS);
var Room = require(Config.PATH_ROOM);

/* This object is used to communicate with the users, it is a singleton */

var Server = function () {
    'use strict';
    if (Server.prototype.instance) {
        return Server.prototype.instance;
    }
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
        var server = new Server();
        server.socket.to(socketClient.id).emit(EmitEvents.SERVER_SEND_ID, socketClient.id);
        socketClient.on(EmitEvents.CLIENT_SEND_LOGIN, server.onLoginReceived);
        socketClient.on(EmitEvents.CLIENT_REQUEST_ROOMS_INFO, server.sendRoomsInfo);
        socketClient.on(EmitEvents.CLIENT_REQUEST_ENTER_ROOM, server.answerEnterRoom);
        return;
    },
    onLoginReceived: function (json) {
        'use strict';
        var pack = JSON.parse(json),
            server = new Server(),
            user;
        if (!server.userList.contains('login', pack.login)) {
            user = new User(pack.id, pack.login);
            server.userList.add(user);
        } else {
            user = server.userList.query('login', pack.login);
            user.id = pack.id;
        }
    },
    sendRoomsInfo: function (id) {
        'use strict';
        var server = new Server(),
            pack = {
                roomList: server.roomList
            };
        if (id) {
            server.socket.to(id).emit(EmitEvents.SERVER_SEND_ROOMS_INFO, JSON.stringify(pack));
            return;
        }
        server.socket.emit(EmitEvents.SERVER_SEND_ROOMS_INFO, JSON.stringify(pack));
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
        if (!room.isFull() && !room.userList.contains('login', login)) {
            user = server.userList.query('login', login);
            room.userList.add(user);
            user.roomNumber = room.number;
            pack = {
                answer: true,
                roomNumber: room.number
            };
            server.socket.to(id).emit(EmitEvents.SERVER_ANSWER_ENTER_ROOM, JSON.stringify(pack));
            server.sendRoomsInfo();
            return;
        }
        pack = {
            answer: false,
            roomNumber: null
        };
        server.socket.to(id).emit(EmitEvents.SERVER_ANSWER_ENTER_ROOM, JSON.stringify(pack));
    }
};

module.exports = Server;