var Credits = {};

Credits = function (game) {
	this.game = game;
};

Credits.prototype = {
	preload:function() {
		//preload da tela de Créditos
		
	},

	create:function() {
		var fundo = game.add.sprite(0, 0, 'tela_creditos');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				//chamada do Menu
				game.state.start('menu', Menu);
			});
		});
	}
};