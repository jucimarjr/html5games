/*global EmitEvents*/

/* This object is responsible for sending messages to the server */

var Sender = function (client, dominoSystem) {
    "use strict";
    this.dominoSystem = dominoSystem;
    this.client = client;
};
Sender.prototype = {
    sendLogin: function () {
        "use strict";
        this.client.socket.emit(EmitEvents.CLIENT_SEND_LOGIN, JSON.stringify(this.dominoSystem.user));
    },
    requestRoomsInfo: function () {
        "use strict";
        this.client.socket.emit(EmitEvents.CLIENT_REQUEST_ROOMS_INFO, this.dominoSystem.user.id);
    },
    requestEnterRoom: function (roomNumber) {
        "use strict";
        var toSend = {user: this.dominoSystem.user, roomNumber: roomNumber};
        this.client.socket.emit(EmitEvents.CLIENT_REQUEST_ENTER_ROOM, JSON.stringify(toSend));
    }
};