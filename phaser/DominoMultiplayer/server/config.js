/*global module*/

/* This object holds the paths used in require function calls and the port in which the server runs */

var Config = {

    /* Server port */
    SERVER_PORT: 3001,

    /* Relative paths */
    PATH_LIST: './list.js',
    PATH_USER: '../shared/user.js',
    PATH_SERVER: './server.js',
    PATH_SOCKETIO: '../shared/socket.io',
    PATH_EMIT_EVENTS: '../shared/emitevents.js'

};

module.exports = Config;