State = {};
State.LudusSplash = function (game){};
State.LudusSplash.prototype = {
	preload: function(){
		game.load.image('ludus-splash',Config.ludusSplash.dir);
	},
	create: function(){
		var sprite = game.add.sprite(Config.ludusSplash.x,Config.ludusSplash.y,'ludus-splash');
		setTimeout(function() {
			game.add.tween(sprite).to({alpha : 0}, Config.ludusSplash.millis, Phaser.Easing.Linear.None).start();
		}, Config.ludusSplash.millis);
		setTimeout(function() {
			game.state.start('GameSplash');
		}, Config.ludusSplash.nextState);
	}
};