/*global Config, console*/

var PlayState = function (game) {
    "use strict";
    this.game = game;
};
PlayState.prototype = {
    preload: function () {
        "use strict";
        console.log("preload");
    },
    create: function () {
        "use strict";
        console.log("created");
    },
    update: function () {
        "use strict";
        console.log("updated");
    }
};