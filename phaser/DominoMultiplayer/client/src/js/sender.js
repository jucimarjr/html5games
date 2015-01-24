/*global EmitEvents, Events, Utils*/

/* This object is responsible for sending messages to the server */

var Sender = function (client, dominoSystem) {
    "use strict";
    this.dominoSystem = dominoSystem;
    this.client = client;
};
Sender.prototype = {
    sendLogin: function () {
        "use strict";
        this.emit(EmitEvents.CLIENT_SEND_LOGIN, Utils.stringify(this.dominoSystem.user));
    },
    requestRoomsInfo: function () {
        "use strict";
        this.emit(EmitEvents.CLIENT_REQUEST_ROOMS_INFO);
    },
    requestEnterRoom: function (roomNumber) {
        "use strict";
        var toSend = {user: this.dominoSystem.user, roomNumber: roomNumber};
        this.emit(EmitEvents.CLIENT_REQUEST_ENTER_ROOM, Utils.stringify(toSend));
    },
    requestExitRoom: function () {
        "use strict";
        this.emit(EmitEvents.CLIENT_REQUEST_EXIT_ROOM, Utils.stringify(this.dominoSystem.user));
    },
    requestTeams: function () {
        "use strict";
        this.emit(EmitEvents.CLIENT_REQUEST_TEAMS, this.dominoSystem.user.id);
    },
    requestDisconnection: function () {
        "use strict";
        this.emit(EmitEvents.CLIENT_REQUEST_DISCONNECTION, Utils.stringify(this.dominoSystem.user));
    },
    emit: function (event, object) {
        "use strict";
        this.client.socket.emit(event, object);
    }
};