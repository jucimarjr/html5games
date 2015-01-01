/*global document, window, Config, Utils*/

/* This object is used to control the login iframe */

var LoginPage = function () {
    'use strict';
    window.frames[Config.LOGIN_IFRAME_ID].onkeypress = Utils.onKeyPressed;
    this.loginFrameDocument = window.frames[Config.LOGIN_IFRAME_ID].document;
    return;
};

LoginPage.prototype = {
    getLoginInput: function () {
        'use strict';
        return this.loginFrameDocument.getElementById(Config.LOGIN_INPUT_ID).value;
    },
    getPasswordInput: function () {
        'use strict';
        return this.loginFrameDocument.getElementById(Config.PASSWORD_INPUT_ID).value;
    },
    showLoginInvalid: function () {
        'use strict';
        this.loginFrameDocument.getElementById(Config.LOGIN_ERROR_DIV_ID).innerHTML = Config.LOGIN_INVALID_TEXT;
    },
    showErrorConnection: function () {
        'use strict';
        this.loginFrameDocument.getElementById(Config.LOGIN_ERROR_DIV_ID).innerHTML = Config.ERROR_CONNECTION_TEXT;
    }
};