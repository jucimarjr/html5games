/*global Config, Codes*/

/* This object contains all functions called in transitions in the state machine */

var Actions = function (dominoSystem) {
    "use strict";
    this.dominoSystem = dominoSystem;
};
Actions.prototype = {
    registerInputCapture: function () {
        "use strict";
        this.dominoSystem.hardware.registerCallbacks();
    },
    showLoginPage: function () {
        "use strict";
        this.dominoSystem.pages.login.show();
    },
    validateLogin: function () {
        "use strict";
        var login = this.dominoSystem.pages.login.getLoginInput(),
            password = this.dominoSystem.pages.login.getPasswordInput();
        this.dominoSystem.client.requestLoginValidation(login, password);
    },
    showLoginInvalid: function () {
        "use strict";
        this.dominoSystem.pages.login.showLoginInvalid();
    },
    showLoginErrorConnection: function () {
        "use strict";
        this.dominoSystem.pages.login.showErrorConnection();
    },
    showRoomsPage: function () {
        "use strict";
        this.dominoSystem.pages.login.hide();
        this.dominoSystem.pages.rooms.show();
    },
    requestServerAddress: function () {
        "use strict";
        this.dominoSystem.client.requestServerAddress();
    },
    connectToSever: function () {
        "use strict";
        this.dominoSystem.client.connect();
    },
    sendLoginToServer: function () {
        "use strict";
        this.dominoSystem.client.sender.sendLogin();
    },
    requestRoomsInfo: function () {
        "use strict";
        this.dominoSystem.client.sender.requestRoomsInfo();
    }
};