/*global Codes, Config*/

/* This object is used to control the login iframe */

var LoginPage = function (window) {
    "use strict";
    this.window = window;
    this.document = this.window.frames[Config.LOGIN_IFRAME_ID].contentWindow.document;
    this.hide();
};
LoginPage.prototype = {
    show: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_BLOCK;
        this.window.frames[Config.LOGIN_IFRAME_ID].style.zIndex = Config.Z_INDEX_FRONT;
    },
    hide: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_NONE;
        this.window.frames[Config.LOGIN_IFRAME_ID].style.zIndex = Config.Z_INDEX_BACK;
    },
    getLoginInput: function () {
        "use strict";
        return this.document.getElementById(Config.LOGIN_INPUT_ID).value;
    },
    getPasswordInput: function () {
        "use strict";
        return this.document.getElementById(Config.PASSWORD_INPUT_ID).value;
    },
    setLoginButtonClickCallback: function (callback) {
        "use strict";
        this.document.getElementById(Config.LOGIN_BUTTON_ID).onclick = callback;
    },
    showLoginInvalid: function () {
        "use strict";
        this.document.getElementById(Config.LOGIN_ERROR_DIV_ID).innerHTML = Config.LOGIN_INVALID_TEXT;
    },
    showErrorConnection: function () {
        "use strict";
        this.document.getElementById(Config.LOGIN_ERROR_DIV_ID).innerHTML = Config.ERROR_CONNECTION_TEXT;
    }
};