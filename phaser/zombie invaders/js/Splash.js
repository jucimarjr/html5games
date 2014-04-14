Splash = function (game) {
    this.game = game;
};

Splash.prototype.preload = function() {
    game.load.image('splashTeam', splashGroupImage);
	game.load.image('splashGame', SplashGameImage);
};

Splash.prototype.create = function() {
	var fundo = game.add.sprite(0, 0, 'splashTeam');
	fundo.alpha = 0;
	
	var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
	setTimeout(function() {
		var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		fadeout.onComplete.add(function() {
			fundo.x = game.width/2;
			fundo.y = game.height/2;
			fundo = game.add.sprite(0, 0, 'splashGame');

			var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
			
			setTimeout(function() {
				var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
				fadeout.onComplete.add(function(){
					console.log("menu");
					game.state.start('menu', Menu);
				});
			}, 2500);
		});
	}, 3000);
};