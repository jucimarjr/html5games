var Level = function(game){
	this.game = game;
	this.sprite = null;
};
Level.prototype = {
	preload:function(){
		this.game.load.image('game-background', Config.dirGameBackground);
	},
	create:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(Config.xBeginWorldBounds, Config.yBeginWorldBounds, Config.xEndWorldBounds, Config.yEndWorldBounds);
		this.sprite = game.add.sprite(Config.xGameBackground, Config.yGameBackground, 'game-background');		
	}
};