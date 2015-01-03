/*global document, window, Codes, Config, Utils*/

/* This object is used to control the login iframe */

var LoginPage = function () {
    "use strict";
    window.frames[Config.LOGIN_IFRAME_ID].style.zIndex = 1;
    window.frames[Config.LOGIN_IFRAME_ID].onkeypress = Utils.onKeyPressed;
    this.document = window.frames[Config.LOGIN_IFRAME_ID].contentWindow.document;
    this.hide();
    return;
};

LoginPage.prototype = {
    show: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_BLOCK;
        window.frames[Config.LOGIN_IFRAME_ID].style.zIndex = 1;
    },
    hide: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_NONE;
        window.frames[Config.LOGIN_IFRAME_ID].style.zIndex = 0;
    },
    getLoginInput: function () {
        "use strict";
        return this.document.getElementById(Config.LOGIN_INPUT_ID).value;
    },
    getPasswordInput: function () {
        "use strict";
        return this.document.getElementById(Config.PASSWORD_INPUT_ID).value;
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