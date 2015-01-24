/*global module*/

/* This object holds the paths used in require function calls and the port in which the server runs */

var Config = {

    /* Room properties */
    NUMBER_ROOMS: 10,
    ROOM_CAPACITY: 4,

    /* Server port */
    SERVER_PORT: 3001,

    /* Relative paths */
    PATH_LIST: "../shared/list.js",
    PATH_USER: "../shared/user.js",
    PATH_SERVER: "./server.js",
    PATH_SOCKETIO: "../shared/socket.io",
    PATH_EMIT_EVENTS: "../shared/emitevents.js",
    PATH_ROOM: "../shared/room.js",
    PATH_DICTIONARY: "../shared/dictionary.js",
    PATH_UTILS: "../shared/utils.js"

};

module.exports = Config;