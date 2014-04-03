var Lose = {};

Lose = function (game) {
	this.game = game;
};

Lose.prototype = {
	preload:function() {
		//preload da tela de Lose
		game.load.image('ssLose', 'assets/screenshots/lose_800-600.png');
	},

	create:function() {
		var bg = game.add.sprite(0, 0, 'ssLose');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				//chamada do Menu
				game.state.start('menu', Menu);
			});
		});
	}
};
