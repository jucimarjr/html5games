/*global State, Config, Phaser*/
var Platforms = function (game) {
    "use strict";
    this.game = game;
};
Platforms.prototype = {
    preload: function () {
        "use strict";
        this.game.load.tilemap('Level', 'assets/images/Level.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('Terrain', 'assets/images/Terrain_150-30.png');
		this.game.load.image('Grass', 'assets/images/Grass_30-30.png');
    },
    create: function () {
        "use strict";
        this.map = this.game.add.tilemap('Level');
		this.map.addTilesetImage('Grass');
		this.map.addTilesetImage('Terrain');
		this.mainLayer = this.map.createLayer('LayerMain');
		this.map.createLayer('LayerUpper');
        this.map.setCollisionByExclusion([0], 'LayerMain');
    }
};