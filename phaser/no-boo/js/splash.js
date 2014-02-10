var Splash = {};

Splash = function (game) {
	this.game = game;
};

Splash.prototype = {
	preload:function() {
		//preload das telas de Splash
		game.load.image('tela_splash_grupo', 'assets/telas/0. splash_grupo.png');
		game.load.image('tela_splash_jogo', 'assets/telas/1. splash_jogo.png');
	},

	create:function() {
		var fundo = game.add.sprite(0, 0, 'tela_splash_grupo');
		fundo.alpha = 0;
	
		var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		setTimeout(function() {
			var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				fundo.loadTexture('tela_splash_jogo');
				var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
				
				setTimeout(function() {
					var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
					fadeout.onComplete.add(function(){
						//chamada do Menu
						game.state.start('menu', Menu);
					});
				}, 2500);
				//}, 0);
			});
		}, 3000);
		//}, 0);
	}
};
