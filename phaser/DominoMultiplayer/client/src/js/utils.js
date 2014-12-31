/*global console, XMLHttpRequest, Codes, dominoSystem, Config, Events*/

/* This object is a library of useful functions*/

var Utils = {
    validateLogin: function (login, password) {
        'use strict';
        var xmlhttp = new XMLHttpRequest(), dir = Config.PHP_VALIDATE_LOGIN_URL;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
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
                if (xmlhttp.status > 400) {
                    dominoSystem.enqueueEvent(Events.ERROR_CONNECTION);
                }
            }
        };
        xmlhttp.open("GET", dir + "?l=" + login + "&p=" + password, true);
        xmlhttp.send();
    }
};