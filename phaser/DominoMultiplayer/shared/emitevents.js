/*global module, exports*/

/* This object holds the socket.io emit events tag names created */

var EmitEvents = Object.freeze({
    CONNECTION: "connection",
    DISCONNECTION: "disconnect",
    ERROR_CONNECTION: "connect_error",
    RECONNECTION: "reconnect",
    CONNECTION_TIMEOUT: "connect_timeout",
    SERVER_SEND_ID: "EmitEvents.SERVER_SEND_ID",
    CLIENT_SEND_LOGIN: "EmitEvents.CLIENT_SEND_LOGIN",
    CLIENT_REQUEST_ROOMS_INFO: "EmitEvents.CLIENT_REQUEST_ROOMS_INFO",
    SERVER_SEND_ROOMS_INFO: "EmitEvents.SERVER_SEND_ROOMS_INFO",
    CLIENT_REQUEST_ENTER_ROOM: "EmitEvents.CLIENT_REQUEST_ENTER_ROOM",
    CLIENT_REQUEST_EXIT_ROOM: "EmitEvents.CLIENT_REQUEST_EXIT_ROOM",
    SERVER_ALLOW_ENTER_ROOM: "EmitEvents.SERVER_ALLOW_ENTER_ROOM",
    SERVER_DENY_ENTER_ROOM: "EmitEvents.SERVER_DENY_ENTER_ROOM",
    SERVER_ACK_EXIT_ROOM: "EmitEvents.SERVER_ACK_EXIT_ROOM",
    SERVER_ACK_LOGIN: "EmitEvents.SERVER_ACK_LOGIN",
    CLIENT_REQUEST_DISCONNECTION: "EmitEvents.CLIENT_REQUEST_DISCONNECTION"
});

try {
    module.exports = EmitEvents;
} catch (ignore) {}