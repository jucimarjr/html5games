/*global Config, Utils, document, window*/

/* this objects contains a library of all functions called in transitions in the state machine*/

var Actions = {
    showLoginPage: function () {
        'use strict';
        document.getElementById(Config.LOGIN_IFRAME_ID).style.display = "block";
    },
    validateLogin: function () {
        'use strict';
        var login, password, loginFrameDocument;
        loginFrameDocument = window.frames[Config.LOGIN_IFRAME_ID].document;
        login = loginFrameDocument.getElementById(Config.LOGIN_INPUT_ID).value;
        password = loginFrameDocument.getElementById(Config.PASSWORD_INPUT_ID).value;
        Utils.validateLogin(login, password);
    }
};