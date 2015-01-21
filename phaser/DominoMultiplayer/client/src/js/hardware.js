/*global Codes, Config, Events, List*/

/* This object captures inputs sended by the user */

var Hardware = function (dominoSystem, window) {
    "use strict";
    this.window = window;
    this.dominoSystem = dominoSystem;
    this.inputValues = {};
    this.listTimeouts = new List();
};
Hardware.prototype = {
    registerCallbacks: function () {
        "use strict";
        this.dominoSystem.pages.login.document.onkeypress = this.onKeyPressed.bind(this);
        this.dominoSystem.pages.login.setLoginButtonClickCallback(this.onLoginButtonClicked.bind(this));
        this.dominoSystem.pages.rooms.onRoomClick = this.onRoomClick.bind(this);
        this.dominoSystem.pages.waitPlayers.backButton.onclick = this.onBackClicked.bind(this);
        this.dominoSystem.pages.rooms.logoutButton.onclick = this.onLogoutClicked.bind(this);
        this.dominoSystem.pages.ready.setInterval = this.setInterval.bind(this);
        this.dominoSystem.pages.ready.clearInterval = this.clearInterval.bind(this);
    },
    onLoginButtonClicked: function () {
        "use strict";
        this.dominoSystem.enqueueEvent(Events.LOGIN_BUTTON_CLICK);
    },
    onKeyPressed: function (event) {
        "use strict";
        if (event.keyCode === Codes.KEYBOARD_ENTER_KEY) {
            this.dominoSystem.enqueueEvent(Events.ENTER_PRESSED);
        }
    },
    onRoomClick: function (roomNumber) {
        "use strict";
        this.inputValues.roomNumber = roomNumber;
        this.dominoSystem.enqueueEvent(Events.ROOM_CLICKED);
    },
    onBackClicked: function () {
        "use strict";
        this.dominoSystem.enqueueEvent(Events.BACK_CLICKED);
    },
    onLogoutClicked: function () {
        "use strict";
        this.dominoSystem.enqueueEvent(Events.LOGOUT_CLICKED);
    },
    setInterval: function (action, interval, timeFinish) {
        "use strict";
        var i, id;
        for (i = 0; i < timeFinish; i = i + 1) {
            id = this.window.setTimeout(action, interval * (i + 1));
            this.listTimeouts.add(id);
        }
        id = this.window.setTimeout(function () { this.dominoSystem.enqueueEvent(Events.INTERVAL_TIMEOUT); }.bind(this), timeFinish * interval);
        this.listTimeouts.add(id);
    },
    clearInterval: function () {
        "use strict";
        var i;
        for (i = 0; i < this.listTimeouts.count; i = i + 1) {
            this.window.clearTimeout(this.listTimeouts.get(i));
        }
    }
};