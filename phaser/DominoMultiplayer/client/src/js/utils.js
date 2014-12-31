/*global console, XMLHttpRequest, Codes, Config*/

/* This object is a library of useful functions*/

var Utils = {
    validateLogin: function (login, password) {
        'use strict';
        var xmlhttp = new XMLHttpRequest(), dir = Config.PHP_VALIDATE_LOGIN_URL;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    var result = parseInt(xmlhttp.responseText, 10);
                    if (result === 1) {
                        console.log(Codes.LOGIN_CONFIRMED);
                        return;
                    }
                    console.log(Codes.LOGIN_ERROR);
                    return;
                }
                if (xmlhttp.status > 400) {
                    console.log(Codes.ERROR_CONNECTION);
                }
            }
        };
        xmlhttp.open("GET", dir + "?l=" + login + "&p=" + password, true);
        xmlhttp.send();
    }
};