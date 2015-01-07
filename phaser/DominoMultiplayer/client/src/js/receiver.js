/*global console, List, EmitEvents, Events*/

/* This object is responsible for capturing messages from server */

var Receiver = function (client, dominoSystem) {
    "use strict";
    this.dominoSystem = dominoSystem;
    this.client = client;
};
Receiver.prototype = {
    registerCallbacks: function () {
        "use strict";
        this.client.socket.on(EmitEvents.SERVER_SEND_ID, this.onServerSendID.bind(this));
        this.client.socket.on(EmitEvents.SERVER_SEND_ROOMS_INFO, this.onServerSendRoomsInfo.bind(this));
        this.client.socket.on(EmitEvents.SERVER_ACK_LOGIN, this.onServerAckLogin.bind(this));
    },
    onServerSendID: function (json) {
        "use strict";
        this.dominoSystem.user.id = JSON.parse(json);
        this.dominoSystem.enqueueEvent(Events.CONNECTION_ESTABLISHED);
    },
    onServerSendRoomsInfo: function (json) {
        "use strict";
        var roomList = new List(),
            listReceived = JSON.parse(json);
        roomList.first = listReceived.first;
        roomList.last = listReceived.last;
        roomList.count = listReceived.count;
        this.dominoSystem.pages.rooms.populateRooms(roomList);
        this.dominoSystem.enqueueEvent(Events.ROOMS_INFO_RECEIVED);
    },
    onServerAckLogin: function () {
        "use strict";
        this.dominoSystem.enqueueEvent(Events.SERVER_ACK_LOGIN);
    }
};