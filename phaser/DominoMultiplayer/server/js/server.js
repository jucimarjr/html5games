/*global require, console*/

var List = require('./list.js');

/* This object represents a connected user */

var User = function (id, login) {
    'use strict';
    this.id = id;
    this.login = login;
};

/* This object is used to communicate with the users */

var Server = function () {
    'use strict';
    if (Server.prototype.instance) {
        return Server.prototype.instance;
    }
    this.socket = require('socket.io');
    this.userList = new List();
    this.socket = null;
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
        Server.getInstance().socket = require('socket.io')(port);
        Server.getInstance().socket.sockets.on('connection', Server.getInstance().onSocketConnection);
    },
    onSocketConnection: function (socketClient) {
        'use strict';
        Server.getInstance().socket.to(socketClient.id).emit('SERVER_SEND_ID', socketClient.id);
        socketClient.on('CLIENT_SEND_LOGIN', Server.getInstance().onLoginReceived);
        return;
    },
    onLoginReceived: function (json) {
        'use strict';
        var pack = JSON.parse(json),
            user = new User(pack.id, pack.login);
        Server.getInstance().userList.add(user);
        console.log(user.login + " connected");
    }
};

Server.getInstance().start(3001);