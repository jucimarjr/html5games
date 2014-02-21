var HowToPlay = {};

HowToPlay = function (game) {
	this.game = game;
};

HowToPlay.prototype = {
	preload:function() {
		game.load.image('creditScreen', 'assets/screenshots/howToPlay_800-480.png');
	},

	create:function() {
		var bg = game.add.sprite(0, 0, 'creditScreen');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				game.state.start('menu', Menu);
			});
		});
	}
};
