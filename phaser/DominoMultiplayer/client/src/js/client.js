/*global console, io, XMLHttpRequest, Config, Codes, EmitEvents, Sender, Receiver, Events*/

/* This object requests remote code to execute and connects to the server object. Also, it embodies all objects and functions related to communication with the server */

var Client = function (dominoSystem, document) {
    "use strict";
    this.socket = null;
    this.remoteAddress = null;
    this.document = document;
    this.dominoSystem = dominoSystem;
    this.receiver = new Receiver(this, dominoSystem);
    this.sender = new Sender(this, dominoSystem);
};
Client.prototype = {
    requestLoginValidation: function (login, password) {
        "use strict";
        var onLoginValidated = function (result) {
            switch (result) {
            case Codes.ERROR_CONNECTION:
                this.dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
                return;
            case Codes.LOGIN_CONFIRMED:
                this.dominoSystem.user.login = login;
                this.dominoSystem.enqueueEvent(Events.LOGIN_CONFIRMED);
                return;
            case Codes.LOGIN_REFUSED:
                this.dominoSystem.enqueueEvent(Events.LOGIN_REFUSED);
                return;
            default:
                console.log("utils.js - validateLogin - PHP unrecognized answer: " + result);
                this.dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
            }
        };
        this.makeRequest(Config.PHP_VALIDATE_LOGIN_ADDRESS + "?l=" + login + "&p=" + password, this, onLoginValidated);
    },
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
        var head = this.document.getElementsByTagName(Codes.HTML_HEAD_TAG)[0],
            script = this.document.createElement(Codes.HTML_SCRIPT_TAG);
        script.type = Codes.HTML_JAVASCRIPT_TEXT_TYPE;
        script.onload = function () {
            try {
                this.socket = io.connect(Codes.HTTP_PREFIX + this.remoteAddress + Config.SERVER_PORT_SUFFIX, {transports: [Codes.WEBSOCKET_TRANSPORT]});
            } catch (exception) {
                this.dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
            }
            this.receiver.registerCallbacks();
        }.bind(this);
        script.src = Codes.HTTP_PREFIX + this.remoteAddress + Config.SERVER_PORT_SUFFIX + Config.JAVASCRIPT_SOCKET_IO_ADDRESS;
        script.onerror = function () { this.dominoSystem.enqueueEvent(Events.ERROR_CONNECTION); }.bind(this);
        head.appendChild(script);
    },
    makeRequest: function (dir, context, onSuccessCallback) {
        "use strict";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === Codes.XML_HTTP_REQUEST_COMPLETED) {
                if (xmlhttp.status === Codes.HTTP_REQUEST_SUCCESSFUL) {
                    onSuccessCallback.call(context, xmlhttp.responseText.toString());
                }
                if (xmlhttp.status > Codes.HTTP_REQUEST_ERROR) {
                    this.dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
                }
            }
        }.bind(this);
        xmlhttp.open(Codes.PHP_GET_METHOD, dir, true);
        xmlhttp.send();
    }
};