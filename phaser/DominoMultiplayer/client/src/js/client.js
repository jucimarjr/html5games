/*global console, document, io, XMLHttpRequest, Config, Codes, EmitEvents, Receiver, Events, window*/

var Client = function (dominoSystem) {
    "use strict";
    this.socket = null;
    this.remoteAddress = null;
    this.dominoSystem = dominoSystem;
    this.receiver = new Receiver(this, dominoSystem);
};
Client.prototype = {
    requestServerAddress: function () {
        "use strict";
        var onReceiveServerAddress = function (remoteAddress) {
            this.remoteAddress = remoteAddress;
            this.dominoSystem.enqueueEvent(Events.IP_RECEIVED);
        };
        this.makeRequest(Config.PHP_OBTAIN_IP_ADDRESS, this, onReceiveServerAddress);
    },
    connect: function () {
        "use strict";
        var head = document.getElementsByTagName(Codes.HTML_HEAD_TAG)[0],
            script = document.createElement(Codes.HTML_SCRIPT_TAG),
            self = this;
        script.type = Codes.HTML_JAVASCRIPT_TEXT_TYPE;
        script.onload = function () {
            self.socket = io.connect(Codes.HTTP_PREFIX + self.remoteAddress + Config.SERVER_PORT_SUFFIX, {transports: [Codes.WEBSOCKET_TRANSPORT]});
            self.receiver.registerCallbacks(self.socket);
        };
        script.src = Codes.HTTP_PREFIX + this.remoteAddress + Config.SERVER_PORT_SUFFIX + Config.JAVASCRIPT_SOCKET_IO_ADDRESS;
        head.appendChild(script);
    },
    makeRequest: function (dir, context, onSuccessCallback) {
        "use strict";
        var xmlhttp = new XMLHttpRequest(), self = this;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === Codes.XML_HTTP_REQUEST_COMPLETED) {
                if (xmlhttp.status === Codes.HTTP_REQUEST_SUCCESSFUL) {
                    onSuccessCallback.call(context, xmlhttp.responseText.toString());
                }
                if (xmlhttp.status > Codes.HTTP_REQUEST_ERROR) {
                    self.dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
                }
            }
        };
        xmlhttp.open(Codes.PHP_GET_METHOD, dir, true);
        xmlhttp.send();
    },
    sendLogin: function () {
        "use strict";
        var login = this.dominoSystem.user.login,
            id = this.dominoSystem.user.id,
            infoContainer = { id: id, login:  login};
        this.socket.emit(EmitEvents.CLIENT_SEND_LOGIN, JSON.stringify(infoContainer));
    },
    requestRoomsInfo: function () {
        "use strict";
        this.socket.emit(EmitEvents.CLIENT_REQUEST_ROOMS_INFO, this.dominoSystem.user.id);
    }
};