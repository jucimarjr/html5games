/*global module, require, console*/

var Config = require('./config.js');
var List = require(Config.PATH_LIST);
var User = require(Config.PATH_USER);
var ServerSocket = require(Config.PATH_SOCKETIO);
var EmitEvents = require(Config.PATH_EMIT_EVENTS);

/* This object is used to communicate with the users */

var Server = function () {
    'use strict';
    if (Server.prototype.instance) {
        return Server.prototype.instance;
    }
    this.userList = new List();
    this.socket = new ServerSocket();
    Server.prototype.instance = this;
};
Server.getInstance = function () {
    'use strict';
    return new Server();
};
Server.prototype = {
    getUserById: function (id) {
        'use strict';
        return Server.getInstance().userList.query('id', id);
    },
    start: function (port) {
        'use strict';
        var server = Server.getInstance();
        server.socket = server.socket.listen(port);
        server.socket.on(EmitEvents.CONNECTION, Server.getInstance().onSocketConnection);
    },
    onSocketConnection: function (socketClient) {
        'use strict';
        var server = Server.getInstance();
        server.socket.to(socketClient.id).emit(EmitEvents.SERVER_SEND_ID, socketClient.id);
        socketClient.on(EmitEvents.CLIENT_SEND_LOGIN, server.onLoginReceived);
        socketClient.on(EmitEvents.DISCONNECTION, function () { server.onSocketDisconnection(socketClient); });
        return;
    },
    onSocketDisconnection: function (socketClient) {
        'use strict';
        var server = Server.getInstance(),
            user = server.getUserById(socketClient.id),
            position;
        if (user !== null) {
            position = server.userList.indexOf(user);
            if (position !== null) {
                server.userList.remove(position);
            }
        }
    },
    onLoginReceived: function (json) {
        'use strict';
        var pack = JSON.parse(json),
            user = new User(pack.id, pack.login);
        Server.getInstance().userList.add(user);
    }
};

module.exports = Server;