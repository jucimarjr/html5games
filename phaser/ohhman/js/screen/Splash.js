Splash = function() {
};

Splash.prototype = {
	preload : function() {
		//Preload das telas de Splash
		game.load.image('bgSplashTeam', fp_bgSplashTeam);
		game.load.image('bgSplashGame', fp_bgSplashGame);
	},

	create : function() {
		var bg = game.add.sprite(0, 0, 'bgSplashTeam');
		bg.alpha = 0;
		
		var fadein = game.add.tween(bg).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		setTimeout(function() {

			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				bg.anchor.setTo(0.5,0.5);
				bg.x = game.width/2;
				bg.y = game.height/2;
				bg.loadTexture('bgSplashGame');			
				
				var fadein = game.add.tween(bg).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
				setTimeout(function() {
					
					var fadeout = game.add.tween(bg).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
					fadeout.onComplete.add(function(){
						//Chamada do Menu
						game.state.start('sceneMenu');
					});
				}, 2500);
			});
		}, 3000);
	}
};
