var Level = function(game){
	this.game = game;
	this.sprite = null;
};
Level.prototype = {
	preload:function(){
		this.game.load.image('game-background', 'assets/images/GameBackground_1920-600.png');
		this.game.load.tilemap('level', 'assets/images/Level 1-1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('Terrain', 'assets/images/Terrain.png');
		this.game.load.image('Grass', 'assets/images/Grass.png');
	},
	create:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(Config.level.worldBounds.xi, Config.level.worldBounds.yi, Config.level.worldBounds.xf, Config.level.worldBounds.yf);
		this.sprite = game.add.tileSprite(Config.level.x, Config.level.y,Config.global.screen.width*2,
		Config.global.screen.height, 'game-background');

		var map = this.game.add.tilemap('level');
		map.addTilesetImage('Grass');
		map.addTilesetImage('Terrain');
		
		map.createLayer('LayerMain');
		map.createLayer('LayerUpper');
		
	},
};