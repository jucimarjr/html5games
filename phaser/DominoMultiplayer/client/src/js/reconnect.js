/*global Codes, Config */

var ReconnectPage = function (window) {
    "use strict";
    this.window = window;
    this.document = this.window.frames[Config.RECONNECT_IFRAME_ID].contentWindow.document;
    this.hide();
};
ReconnectPage.prototype = {
    show: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_BLOCK;
        this.window.frames[Config.RECONNECT_IFRAME_ID].style.zIndex = Config.Z_INDEX_RECONNECT_PAGE;
    },
    hide: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_NONE;
        this.window.frames[Config.RECONNECT_IFRAME_ID].style.zIndex = Config.Z_INDEX_BACK;
    }
};
