State.GameSplash = function (game){};
State.GameSplash.prototype = {
	preload: function(){
		game.load.image('game-splash',Config.dirGameSplash);
	},
	create: function(){
		var sprite = game.add.sprite(Config.xGameSplash,Config.yGameSplash,'game-splash');
		setTimeout(function() {
			game.add.tween(sprite).to({alpha : 0}, Config.millisGameSplash, Phaser.Easing.Linear.None).start();
		}, Config.millisGameSplash);
		setTimeout(function() {
			game.state.start('Menu');
		}, Config.millisNextState);
	}
};