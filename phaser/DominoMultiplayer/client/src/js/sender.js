/*global console, EmitEvents, Events*/

/* This object is responsible for sending messages to the server */

var Sender = function (client, dominoSystem) {
    "use strict";
    this.dominoSystem = dominoSystem;
    this.client = client;
};
Sender.prototype = {
    sendLogin: function () {
        "use strict";
        this.emit(EmitEvents.CLIENT_SEND_LOGIN, JSON.stringify(this.dominoSystem.user));
    },
    requestRoomsInfo: function () {
        "use strict";
        this.emit(EmitEvents.CLIENT_REQUEST_ROOMS_INFO);
    },
    requestEnterRoom: function (roomNumber) {
        "use strict";
        var toSend = {user: this.dominoSystem.user, roomNumber: roomNumber};
        this.emit(EmitEvents.CLIENT_REQUEST_ENTER_ROOM, JSON.stringify(toSend));
    },
    requestExitRoom: function () {
        "use strict";
        this.emit(EmitEvents.CLIENT_REQUEST_EXIT_ROOM, JSON.stringify(this.dominoSystem.user));
    },
    requestDisconnection: function () {
        "use strict";
        this.emit(EmitEvents.CLIENT_REQUEST_DISCONNECTION, JSON.stringify(this.dominoSystem.user));
    },
    emit: function (event, object) {
        "use strict";
        try {
            this.client.socket.emit(event, object);
        } catch (exception) {
            this.dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
            console.log("sender.js - Sender.emit - exception: " + exception);
        }
    }
};