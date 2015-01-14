/*global Codes, Config, Events*/

/* This object captures inputs sended by the user */

var Hardware = function (dominoSystem, window) {
    "use strict";
    this.window = window;
    this.dominoSystem = dominoSystem;
    this.inputValues = {};
};
Hardware.prototype = {
    registerCallbacks: function () {
        "use strict";
        this.dominoSystem.pages.login.onkeypress = this.onKeyPressed.bind(this);
        this.dominoSystem.pages.login.setLoginButtonClickCallback(this.onLoginButtonClicked.bind(this));
        this.dominoSystem.pages.rooms.onkeypress = this.onKeyPressed.bind(this);
        this.dominoSystem.pages.rooms.onRoomClick = this.onRoomClick.bind(this);
        this.dominoSystem.pages.waitMorePlayers.backButton.onclick = this.onBackClicked.bind(this);
        this.dominoSystem.pages.rooms.logoutButton.onclick = this.onLogoutClicked.bind(this);
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
    }
};