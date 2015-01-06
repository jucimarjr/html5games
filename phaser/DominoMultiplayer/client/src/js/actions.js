/*global Config, Codes, Utils, document, console, window, dominoSystem*/

/* This object contains a library of all functions called in transitions in the state machine */

var Actions = {
    showLoginPage: function () {
        "use strict";
        dominoSystem.pages.login.show();
    },
    validateLogin: function () {
        "use strict";
        var login, password;
        login = dominoSystem.pages.login.getLoginInput();
        password = dominoSystem.pages.login.getPasswordInput();
        Utils.validateLogin(login, password);
    },
    showLoginInvalid: function () {
        "use strict";
        dominoSystem.pages.login.showLoginInvalid();
    },
    showLoginErrorConnection: function () {
        "use strict";
        dominoSystem.pages.login.showErrorConnection();
    },
    showRoomsPage: function () {
        "use strict";
        dominoSystem.pages.login.hide();
        dominoSystem.pages.rooms.show();
    },
    requestServerAddress: function () {
        "use strict";
        dominoSystem.client.requestServerAddress();
    },
    connectToSever: function () {
        "use strict";
        dominoSystem.client.connect();
    },
    sendLoginToServer: function () {
        "use strict";
        dominoSystem.client.sendLogin();
    },
    requestRoomsInfo: function () {
        "use strict";
        dominoSystem.client.requestRoomsInfo();
    }
};