Map1 = function () {
	this.map = null;
	this.tileset = null;
	this.layer = null;
};

Map1.prototype = {
	preload : function() {
		game.load.tilemap('map1', fp_map1, null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tile1', fp_tile1);
		game.load.image('ball', fp_tlBall);
	},

	create : function() {
		this.map = game.add.tilemap('map1');	
		this.tileset = this.map.addTilesetImage('tile1', 'tile1');	
		this.tileset = this.map.addTilesetImage('ball', 'ball');	
		this.layer = this.map.createLayer('Camada de Tiles');		
		this.layer.resizeWorld();

		this.map.setCollision(1);
	},
	
	update : function() {
	}
};
