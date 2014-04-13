Credits = function() {
};

Credits.prototype = {
	preload:function() {
		//preload da tela de Créditos
		game.load.image('bgCredits', fp_bgCredits);
	},

	create:function() {
		var bg = game.add.sprite(0, 0, 'bgCredits');
		
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				//chamada do Menu
				game.state.start('sceneMenu');
			});
		});
	}
};
