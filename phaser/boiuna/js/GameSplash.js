State.GameSplash = function (game){};
State.GameSplash.prototype = {
	preload: function(){
		game.load.image('game-splash',Config.gameSplash.dir);
	},
	create: function(){
		var sprite = game.add.sprite(Config.gameSplash.x,Config.gameSplash.y,'game-splash');
		setTimeout(function() {
			game.add.tween(sprite).to({alpha : 0}, Config.gameSplash.millis, Phaser.Easing.Linear.None).start();
		}, Config.gameSplash.millis);
		setTimeout(function() {
			game.state.start('Menu');
		}, Config.gameSplash.nextState);
	}
};