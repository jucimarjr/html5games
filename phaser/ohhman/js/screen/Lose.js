Lose = function() {
};

Lose.prototype = {
	preload:function() {
		//preload da tela de Lose
		game.load.image('bgLose', fp_bgLose);
	},

	create:function() {
		var bg = game.add.sprite(0, 0, 'bgLose');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				game.state.start('highScoresInput');
			});
		});
	}
};
