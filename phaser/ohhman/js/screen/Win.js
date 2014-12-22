Win = function() {
};

Win.prototype = {
	preload:function() {
		//Preload da tela de Win
		game.load.image('bgWin', fp_bgWin);
	},

	create:function() {
		var bg = game.add.sprite(0, 0, 'bgWin');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {				
				game.state.start('highScoresInput');
			});
		});
	}
};
