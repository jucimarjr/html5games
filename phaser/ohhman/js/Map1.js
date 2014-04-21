Map1 = function () {
	this.map = null;
	this.tileset = null;
	this.layer = null;
	this.layer2 = null;
	this.decisionPoint = null;
	this.ball = null;
};

Map1.prototype = {
	preload : function() {
		game.load.tilemap('map1', fp_map1, null, Phaser.Tilemap.TILED_JSON);		
		game.load.image('fp_allTiles', fp_allTiles);	
	},

	create : function() {
		this.map = game.add.tilemap('map1');	
		
		this.tileset = this.map.addTilesetImage('allTiles', 'fp_allTiles');	
		
		this.ball = game.add.group();
		this.ball.enableBody = true;
		
		this.layer = this.map.createLayer(fp_wallLayer);		
		this.layer2 = this.map.createLayer(fp_ballLayer, game.width, game.height, this.ball);	
		
		this.layer.resizeWorld();		

		this.map.setCollision(1, true, fp_wallLayer);
		this.map.setCollision(2, true, fp_ballLayer);
		
		this.decisionPoint = game.add.group();
		this.decisionPoint.enableBody = true;		
		this.map.createFromObjects('Decision Layer', 34, '', 0, true, false, this.decisionPoint);			
		
	},
	
	update : function() {		
	}
};
