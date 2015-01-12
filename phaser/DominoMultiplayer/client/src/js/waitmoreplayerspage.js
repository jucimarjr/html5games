/*global Codes, Config*/

/* This object is used to control the login iframe */

var WaitMorePlayersPage = function (window) {
    "use strict";
    this.window = window;
    this.document = this.window.frames[Config.WAIT_MORE_PLAYERS_IFRAME_ID].contentWindow.document;
    this.hide();
    this.backButton = this.document.getElementById(Config.BACK_BUTTON_ID);
};
WaitMorePlayersPage.prototype = {
    show: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_BLOCK;
        this.window.frames[Config.WAIT_MORE_PLAYERS_IFRAME_ID].style.zIndex = Config.Z_INDEX_FRONT;
    },
    hide: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_NONE;
        this.window.frames[Config.WAIT_MORE_PLAYERS_IFRAME_ID].style.zIndex = Config.Z_INDEX_BACK;
    }
};