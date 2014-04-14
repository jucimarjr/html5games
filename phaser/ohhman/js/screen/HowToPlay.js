HowToPlay = function() {
};

HowToPlay.prototype = {
	preload:function() {
		//Preload da tela de Créditos
		game.load.image('bgHowToPlay', fp_bgHowtoPlay);
	},

	create:function() {
		var bg = game.add.sprite(0, 0, 'bgHowToPlay');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				//Chamada do Menu
				game.state.start('sceneMenu');
			});
		});
	}
};
