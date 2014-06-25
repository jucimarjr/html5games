/*global require, console*/

var util, io, socketServer;

function onUserClicked(object) {
    'use strict';
    socketServer.emit('create rectangle', object);
}

function onSocketConnection(socketClient) {
    'use strict';
    socketClient.on('user clicked!', onUserClicked);
}

function init() {
    'use strict';
    io = require('socket.io');
    socketServer = io.listen(3000);
    socketServer.on('connection', onSocketConnection);
}

init();