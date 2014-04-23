Map1 = function () {
	this.map = null;
	this.tileset = null;
	this.layer = null;
	this.balls = null;
};

Map1.prototype = {
	preload : function() {
		game.load.tilemap('map1', fp_map1, null, Phaser.Tilemap.TILED_JSON);		
		game.load.image('fp_allTiles', fp_allTiles);	
	},

	create : function() {
		this.map = game.add.tilemap('map1');	
		
		this.tileset = this.map.addTilesetImage('allTiles', 'fp_allTiles');	
		
		this.layer = this.map.createLayer(fp_wallLayer);				
		this.layer.resizeWorld();		

		this.map.setCollision(1, true, fp_wallLayer);		
		
		this.balls = game.add.group();
		this.balls.enableBody = true;
		
		this.map.createFromObjects(fp_ballLayer, 2, 'allTiles', 0, true, false, this.balls);			
		
	},
	
	update : function() {		
	}
};
