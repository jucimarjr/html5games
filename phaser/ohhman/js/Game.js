Game = function () {
};

Game.prototype = {
	preload : function() {
		game.load.tilemap('map1', fp_map1, null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tile1', fp_tile1);

		this.loadOhhman();
		this.loadGhosts();
	},

	create : function() {
		this.loadMap();
		
		ohhMan.create();
		blinky.create();
	},
	
	update : function() {
		ohhMan.update();
		blinky.update();
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
	},
	
	loadGhosts : function() {
		blinky = new Blinky();
		blinky.preload();
	}
};
