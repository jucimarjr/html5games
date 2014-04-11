var Game = {};

Game = function () {
};

Game.prototype = {
	preload : function() {
		game.load.tilemap('map1', 'assets/tilemaps/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tile1', 'assets/tilemaps/tiles/tile1.png');

		this.loadOhhman();
	},

	create : function() {
		this.loadMap();
		ohhMan.create();
	},
	
	update : function() {
		ohhMan.update();
	},


	loadMap : function() {
		var map = game.add.tilemap('map1');	
		map.addTilesetImage('tile1', 'tile1');	
		layer = map.createLayer('Camada de Tiles');		
		layer.resizeWorld();
	},

	loadOhhman : function() {
		ohhMan = new Ohhman();
		ohhMan.preload();
	}
};
