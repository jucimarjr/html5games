Map1 = function () {
	this.map = null;
	this.tileset = null;
	this.layer = null;
	this.balls = null;
	this.decision = null;
};

Map1.prototype = {
	preload : function() {
		game.load.tilemap('map1', fp_map1, null, Phaser.Tilemap.TILED_JSON);		
		game.load.image('fp_walls', fp_walls);		
		game.load.image('fp_balls', fp_balls);
		game.load.image('fp_decision', fp_decision);
	},

	create : function() {
		this.map = game.add.tilemap('map1');	
		
		this.tileset = this.map.addTilesetImage('wall', 'fp_walls');	
		
		this.layer = this.map.createLayer(fp_wallLayer);				
		this.layer.resizeWorld();		

		this.map.setCollision(1, true, fp_wallLayer);		
		
		this.balls = game.add.group();
		this.balls.enableBody = true;
		
		this.map.createFromObjects(fp_ballLayer, 2, 'fp_balls', 0, true, false, this.balls);	

		this.decision = game.add.group();
		this.decision.enableBody = true;
		
		this.map.createFromObjects(fp_decicionLayer, 3, 'fp_decision', 0, true, false, this.decision);					
	},
	
	update : function() {		
	}
};
