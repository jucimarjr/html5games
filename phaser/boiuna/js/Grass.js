/*global Config*/

var Grass = function (game, tilemap) {
    "use strict";
    this.game = game;
    this.tilemap = tilemap;
};
Grass.prototype = {
    preload: function () {
        "use strict";
        this.game.load.image('grass', Config.grass.dir);
    },
    create: function () {
        "use strict";
		this.tilemap.map.createLayer(Config.grass.layer);
        this.tilemap.map.addTilesetImage(Config.grass.tileset, 'grass');
    }
};