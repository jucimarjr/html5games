var Instrucoes = {};

Instrucoes = function (game) {
	this.game = game;
};

Instrucoes.prototype = {
	preload:function() {
		//preload da tela de Instruções
		game.load.image('tela_instrucoes', 'assets/telas/3. instrucoes.png');
	},

	create:function() {
		var fundo = game.add.sprite(0, 0, 'tela_instrucoes');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				//chamada do Menu
				game.state.start('menu', Menu);
			});
		});
	}
};
