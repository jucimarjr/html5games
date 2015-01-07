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
        var login = this.dominoSystem.user.login,
            id = this.dominoSystem.user.id,
            infoContainer = { id: id, login:  login};
        this.client.socket.emit(EmitEvents.CLIENT_SEND_LOGIN, JSON.stringify(infoContainer));
    },
    requestRoomsInfo: function () {
        "use strict";
        this.client.socket.emit(EmitEvents.CLIENT_REQUEST_ROOMS_INFO, this.dominoSystem.user.id);
    }
};