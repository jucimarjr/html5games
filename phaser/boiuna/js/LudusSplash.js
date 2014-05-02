State = {};
State.LudusSplash = function (game){};
State.LudusSplash.prototype = {
	preload: function(){
		game.load.image('ludus-splash',Config.dirLudusSplash);
	},
	create: function(){
		var sprite = game.add.sprite(Config.xLudusSplash,Config.yLudusSplash,'ludus-splash');
		setTimeout(function() {
			game.add.tween(sprite).to({alpha : 0}, Config.millisLudusSplash, Phaser.Easing.Linear.None).start();
		}, Config.millisLudusSplash);
		setTimeout(function() {
			game.state.start('GameSplash');
		}, Config.millisNextState);
	}
};