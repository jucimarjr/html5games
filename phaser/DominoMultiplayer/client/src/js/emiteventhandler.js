/*global console, EmitEvents, Events*/

var EmitEventHandler = function (client, dominoSystem) {
    "use strict";
    this.dominoSystem = dominoSystem;
    this.client = client;
};
EmitEventHandler.prototype = {
    registerCallbacks: function () {
        "use strict";
        this.socket.on(EmitEvents.SERVER_SEND_ID, this.onServerSendID.bind(this));
        this.socket.on(EmitEvents.SERVER_SEND_ROOMS_INFO, this.onServerSendRoomsInfo.bind(this));
    },
    onServerSendID: function (json) {
        "use strict";
        var objReceived = JSON.parse(json);
        this.client.id = objReceived.id;
        this.dominoSystem.enqueueEvent(Events.CONNECTION_ESTABLISHED);
    },
    onServerSendRoomsInfo: function (json) {
        "use strict";
        console.log(json);
    }
};