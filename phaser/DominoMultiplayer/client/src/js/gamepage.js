/*global Config, Codes*/

var GamePage = function (window) {
    "use strict";
    this.window = window;
    this.document = this.window.frames[Config.GAME_IFRAME_ID].contentWindow.document;
};
GamePage.prototype = {
    show: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_BLOCK;
        this.window.frames[Config.GAME_IFRAME_ID].style.zIndex = Config.Z_INDEX_FRONT;
    },
    hide: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_NONE;
        this.window.frames[Config.GAME_IFRAME_ID].style.zIndex = Config.Z_INDEX_BACK;
    }
};