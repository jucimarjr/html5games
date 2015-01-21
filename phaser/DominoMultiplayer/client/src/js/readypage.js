/*global Codes, Config, Utils*/

/* This object is used to control the ready iframe */

var ReadyPage = function (window) {
    "use strict";
    this.window = window;
    this.document = this.window.frames[Config.READY_IFRAME_ID].contentWindow.document;
    this.countdownDiv = this.document.getElementById(Config.READY_COUNTDOWN_DIV_ID);
    this.backButton = this.document.getElementById(Config.BACK_BUTTON_ID);
    this.setInterval = null;
    this.clearInterval = null;
};
ReadyPage.prototype = {
    show: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_BLOCK;
        this.window.frames[Config.READY_IFRAME_ID].style.zIndex = Config.Z_INDEX_FRONT;
    },
    hide: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_NONE;
        this.window.frames[Config.READY_IFRAME_ID].style.zIndex = Config.Z_INDEX_BACK;
    },
    startCountdown: function () {
        "use strict";
        this.countdownDiv.innerHTML = Config.READY_COUNTDOWN_SECONDS;
        this.setInterval(this.count.bind(this), Config.READY_COUNTDOWN_TICK_MILIS, Config.READY_COUNTDOWN_SECONDS);
    },
    stopCountdown: function () {
        "use strict";
        this.countdownDiv.innerHTML = Config.READY_COUNTDOWN_SECONDS;
        this.clearInterval();
    },
    count: function () {
        "use strict";
        this.countdownDiv.innerHTML = Utils.parseInt(this.countdownDiv.innerHTML, Codes.DECIMAL_SYSTEM) - 1;
    }
};