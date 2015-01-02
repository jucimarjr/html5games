/*global module, exports*/

/* This object holds the socket.io emit events tag names created */

var EmitEvents = Object.freeze({
    CONNECTION: "connection",
    DISCONNECTION: "disconnect",
    SERVER_SEND_ID: "EmitEvents.SERVER_SEND_ID",
    CLIENT_SEND_LOGIN: "EmitEvents.CLIENT_SEND_LOGIN",
    CLIENT_REQUEST_ROOMS_INFO: "EmitEvents.CLIENT_REQUEST_ROOMS_INFO",
    SERVER_SEND_ROOMS_INFO: "EmitEvents.SERVER_SEND_ROOMS_INFO",
    CLIENT_REQUEST_ENTER_ROOM: "EmitEvents.CLIENT_REQUEST_ENTER_ROOM",
    CLIENT_REQUEST_EXIT_ROOM: "EmitEvents.CLIENT_REQUEST_EXIT_ROOM",
    SERVER_ANSWER_ENTER_ROOM: "EmitEvents.SERVER_ANSWER_ENTER_ROOM"
});

try {
    module.exports = EmitEvents;
} catch (ignore) {}