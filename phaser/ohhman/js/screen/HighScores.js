HighScores = function() {
};

HighScores.prototype = {
	preload:function() {
		//Preload da tela de High Scores
//		game.load.image('bgHighScores', fp_bgHighScores);
		game.load.image('bgHighScores', fp_bgHighScores);
	},

	create:function() {
		var bg = game.add.sprite(0, 0, 'bgHighScores');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				//Chamada do Menu
				game.state.start('sceneMenu');
			});
		});
	}
};
