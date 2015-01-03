/*global document, window, Codes, Config, Utils*/

/* This object is used to control the login iframe */

var RoomsPage = function () {
    "use strict";
    window.frames[Config.ROOMS_IFRAME_ID].onkeypress = Utils.onKeyPressed;
    this.document = window.frames[Config.ROOMS_IFRAME_ID].contentWindow.document;
    this.hide();
    return;
};

RoomsPage.prototype = {
    show: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_BLOCK;
        window.frames[Config.ROOMS_IFRAME_ID].style.zIndex = 1;
    },
    hide: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_NONE;
        window.frames[Config.ROOMS_IFRAME_ID].style.zIndex = 0;
    }
};