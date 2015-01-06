/*global console, List, EmitEvents, Events*/

var Receiver = function (client, dominoSystem) {
    "use strict";
    this.dominoSystem = dominoSystem;
    this.client = client;
};
Receiver.prototype = {
    registerCallbacks: function (socket) {
        "use strict";
        socket.on(EmitEvents.SERVER_SEND_ID, this.onServerSendID.bind(this));
        socket.on(EmitEvents.SERVER_SEND_ROOMS_INFO, this.onServerSendRoomsInfo.bind(this));
        socket.on(EmitEvents.SERVER_ACK_LOGIN, this.onServerAckLogin.bind(this));
    },
    onServerSendID: function (json) {
        "use strict";
        var objReceived = JSON.parse(json);
        this.dominoSystem.user.id = objReceived.id;
        this.dominoSystem.enqueueEvent(Events.CONNECTION_ESTABLISHED);
    },
    onServerSendRoomsInfo: function (json) {
        "use strict";
        var objReceived = JSON.parse(json),
            roomList = new List();
        roomList.first = objReceived.roomList.first;
        roomList.last = objReceived.roomList.last;
        roomList.count = objReceived.roomList.count;
        this.dominoSystem.pages.rooms.populateRooms(roomList);
        this.dominoSystem.enqueueEvent(Events.ROOMS_INFO_RECEIVED);
    },
    onServerAckLogin: function () {
        "use strict";
        this.dominoSystem.enqueueEvent(Events.SERVER_ACK_LOGIN);
    }
};