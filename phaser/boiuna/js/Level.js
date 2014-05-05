var Level = function(game){
	this.game = game;
	this.sprite = null;
};
Level.prototype = {
	preload:function(){
		this.game.load.image('game-background', Config.level.dir);
	},
	create:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(Config.level.worldBounds.xi, Config.level.worldBounds.yi, Config.level.worldBounds.xf, Config.level.worldBounds.yf);
		this.sprite = game.add.sprite(Config.level.x, Config.level.y, 'game-background');		
	}
};