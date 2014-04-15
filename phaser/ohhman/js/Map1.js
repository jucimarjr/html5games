Map1 = function () {
	this.map = null;
	this.tileset = null;
	this.tileset2 = null;
	this.layer = null;
	this.layer2 = null;
	this.decisionPoint = null;
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
		this.tileset2 = this.map.addTilesetImage('ball', 'ball');	
		
		this.layer = this.map.createLayer('Wall Layer');		
		this.layer2 = this.map.createLayer('Ball Layer');		
		
		this.layer.resizeWorld();		

		this.map.setCollision(1, true, 'Wall Layer');
		this.map.setCollision(2, true, 'Ball Layer');
		
		this.decisionPoint = game.add.group();
		this.decisionPoint.enableBody = true;		
		this.map.createFromObjects('Decision Layer', 34, '', 0, true, false, this.decisionPoint);
		
	},
	
	update : function() {
	}
};
