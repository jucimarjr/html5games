var Perdeu = {};

Perdeu = function (game) {
	this.game = game;
};

Perdeu.prototype = {
	preload:function() {
		//preload da tela de Perdeu
		game.load.image('tela_perdeu', 'assets/telas/6. perdeu.png');
	},

	create:function() {
		var fundo = game.add.sprite(0, 0, 'tela_perdeu');
		setTimeout(function(){
			game.state.start('menu', Menu);
		}, 3000);
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				//chamada do Menu
				game.state.start('menu', Menu);
			});
		});
	}
};
