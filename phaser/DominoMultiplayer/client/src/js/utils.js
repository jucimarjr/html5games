/*global console, XMLHttpRequest, Codes, dominoSystem, Config, Events*/

/* This object is a library of useful functions*/

var Utils = {
    validateLogin: function (login, password) {
        'use strict';
        var xmlhttp = new XMLHttpRequest(), dir = Config.PHP_VALIDATE_LOGIN_ADDRESS;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === Codes.XML_HTTP_REQUEST_COMPLETED) {
                if (xmlhttp.status === Codes.HTTP_REQUEST_SUCCESSFUL) {
                    var result = xmlhttp.responseText.toString();
                    switch (result) {
                    case Codes.ERROR_CONNECTION:
                        dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
                        return;
                    case Codes.LOGIN_CONFIRMED:
                        dominoSystem.enqueueEvent(Events.LOGIN_CONFIRMED);
                        return;
                    case Codes.LOGIN_REFUSED:
                        dominoSystem.enqueueEvent(Events.LOGIN_REFUSED);
                        return;
                    default:
                        console.log("utils.js - validateLogin - PHP unrecognized answer: " + result);
                        dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
                        return;
                    }
                }
                if (xmlhttp.status > Codes.HTTP_REQUEST_ERROR) {
                    dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
                }
            }
        };
        xmlhttp.open(Codes.PHP_GET_METHOD, dir + "?l=" + login + "&p=" + password, true);
        xmlhttp.send();
    },
    onKeyPressed: function (event) {
        'use strict';
        if (event.keyCode === Codes.KEYBOARD_ENTER_KEY) {
            dominoSystem.enqueueEvent(Events.ENTER_PRESSED);
        }
    }
};