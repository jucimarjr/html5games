/*global Config, Codes, Utils, document, console, window, dominoSystem*/

/* This object contains a library of all functions called in transitions in the state machine */

var Actions = {
    showLoginPage: function () {
        'use strict';
        document.getElementById(Config.LOGIN_IFRAME_ID).style.display = Codes.CSS_DISPLAY_BLOCK;
    },
    validateLogin: function () {
        'use strict';
        var login, password;
        login = dominoSystem.pages.login.getLoginInput();
        password = dominoSystem.pages.login.getPasswordInput();
        Utils.validateLogin(login, password);
    },
    showLoginInvalid: function () {
        'use strict';
        dominoSystem.pages.login.showLoginInvalid();
    },
    showLoginErrorConnection: function () {
        'use strict';
        dominoSystem.pages.login.showErrorConnection();
    }
};