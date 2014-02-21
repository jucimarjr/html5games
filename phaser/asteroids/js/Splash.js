var Splash = {};

Splash = function (game) {
	this.game = game;
};

Splash.prototype.preload = function() {
		//preload das telas de Splash
		game.load.image('splashTeam', 'assets/screenshots/splashTeam_800-480.png');
		game.load.atlas('splashGame', 'assets/spritesheets/TitlesSpriteSheet.png', 'assets/spritesheets/TitlesSpriteSheet.json');
};

Splash.prototype.create = function() {
		var fundo = game.add.sprite(0, 0, 'splashTeam');
		fundo.alpha = 0;
	
		var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		setTimeout(function() {
			var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				fundo.anchor.setTo(0.5,0.5);
				fundo.x = game.width/2;
				fundo.y = game.height/2;
				fundo.loadTexture('splashGame');
				fundo.animations.add('blink', ['title1_532-111.png', 'title2_532-111.png'], 15, true, false);
				fundo.animations.play('blink');
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
};
