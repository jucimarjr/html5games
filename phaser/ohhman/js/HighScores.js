var HighScores = {};

HighScores = function (game) {
	this.game = game;
};

HighScores.prototype = {
	preload:function() {
		//preload da tela de High Scores
//		game.load.image('ssHighScores', 'assets/screenshots/highScores_800-600.png');
		game.load.image('ssHighScores', 'assets/screenshots/highScores_800-600_example.png');
	},

	create:function() {
		var bg = game.add.sprite(0, 0, 'ssHighScores');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				//chamada do Menu
				game.state.start('menu', Menu);
			});
		});
	}
};
