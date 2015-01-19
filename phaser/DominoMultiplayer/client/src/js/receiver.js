/*global console, List, EmitEvents, Events*/

/* This object is responsible for capturing messages from server */

var Receiver = function (client, dominoSystem) {
    "use strict";
    this.dominoSystem = dominoSystem;
    this.client = client;
    this.receivedValues = {};
};
Receiver.prototype = {
    registerCallbacks: function () {
        "use strict";
        try {
            this.client.socket.on(EmitEvents.SERVER_SEND_ID, this.onServerSendID.bind(this));
            this.client.socket.on(EmitEvents.SERVER_SEND_ROOMS_INFO, this.onServerSendRoomsInfo.bind(this));
            this.client.socket.on(EmitEvents.SERVER_ACK_LOGIN, this.onServerAckLogin.bind(this));
            this.client.socket.on(EmitEvents.SERVER_ACK_EXIT_ROOM, this.onServerAckExit.bind(this));
            this.client.socket.on(EmitEvents.SERVER_ALLOW_ENTER_ROOM, this.onServerAllowEnterRoom.bind(this));
            this.client.socket.on(EmitEvents.ERROR_CONNECTION, this.onConnectionError.bind(this));
            this.client.socket.on(EmitEvents.CONNECTION_TIMEOUT, this.onConnectionError.bind(this));
            this.client.socket.on(EmitEvents.RECONNECTION, this.onReconnection.bind(this));
            this.client.socket.on(EmitEvents.SERVER_ALLOW_GAME, this.onReadyForGame.bind(this));
            this.client.socket.on(EmitEvents.SERVER_DISALLOW_GAME, this.onUnreadyForGame.bind(this));
        } catch (exception) {
            this.dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
        }
    },
    onServerSendID: function (json) {
        "use strict";
        this.dominoSystem.user.id = JSON.parse(json);
        this.dominoSystem.enqueueEvent(Events.CONNECTION_ESTABLISHED);
    },
    onServerSendRoomsInfo: function (json) {
        "use strict";
        var roomList = new List(),
            received = JSON.parse(json),
            i;
        roomList = new List(received);
        for (i = 0; i < roomList.count; i = i + 1) {
            roomList.get(i).userList = new List(roomList.get(i).userList);
        }
        this.receivedValues.roomList = roomList;
        this.dominoSystem.enqueueEvent(Events.ROOMS_INFO_RECEIVED);
    },
    onServerAckLogin: function () {
        "use strict";
        this.dominoSystem.enqueueEvent(Events.SERVER_ACK_LOGIN);
    },
    onServerAllowEnterRoom: function (roomNumber) {
        "use strict";
        this.dominoSystem.user.roomNumber = roomNumber;
        this.dominoSystem.enqueueEvent(Events.SERVER_ALLOW_ENTER_ROOM);
    },
    onServerAckExit: function () {
        "use strict";
        this.dominoSystem.user.roomNumber = null;
        this.dominoSystem.enqueueEvent(Events.SERVER_ACK_EXIT_ROOM);
    },
    onConnectionError: function () {
        "use strict";
        this.dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
    },
    onReconnection: function () {
        "use strict";
        this.dominoSystem.enqueueEvent(Events.RECONNECTION);
    },
    onReadyForGame: function () {
        "use strict";
        this.dominoSystem.enqueueEvent(Events.READY_FOR_GAME);
    },
    onUnreadyForGame: function () {
        "use strict";
        this.dominoSystem.enqueueEvent(Events.UNREADY_FOR_GAME);
    }
};