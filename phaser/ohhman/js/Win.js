var Win = {};

Win = function () {
};

Win.prototype = {
	preload:function() {
		//preload da tela de Win
		game.load.image('ssWin', 'assets/screenshots/win_800-600.png');
	},

	create:function() {
		var bg = game.add.sprite(0, 0, 'ssWin');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				//chamada do Menu
				game.state.start('menu', Menu);
			});
		});
	}
};
