Splash = function (game) {
    this.game = game;
    this.groupSplashImage = 'assets/screenshots/SplashTeam_800-600.png';
    this.gameSplashImage = 'assets/screenshots/SplashGame_800-600.png';
};

Splash.prototype.preload = function() {
    game.load.image('splashTeam', this.groupSplashImage);
	game.load.image('splashGame', this.gameSplashImage);
};

Splash.prototype.create = function() {
	var fundo = game.add.sprite(0, 0, 'splashTeam');
	fundo.alpha = 0;
	game.state.start('menu', Menu);
	//var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
//	setTimeout(function() {
//		var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
//		fadeout.onComplete.add(function() {
//			var music;
//			music = game.add.audio('Splash_Sound',1,false);
//
//		    music.play('',0,1,true);
//			fundo.x = game.width/2;
//			fundo.y = game.height/2;
//			fundo = game.add.sprite(0, 0, 'splashGame');
////			fundo.anchor.setTo(0.5,0.5);
//			
////			fundo.loadTexture('splashGame');
////			fundo.animations.add('blink', ['title1_532-111.png', 'title2_532-111.png'], 15, true, false);
////			fundo.animations.play('blink');
//			var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
//			
//			setTimeout(function() {
//				var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
//				fadeout.onComplete.add(function(){
//					console.log("menu");
//					music.pause();
//					game.state.start('menu', Menu);
//				});
//			}, 2500);
//		});
//	}, 3000);
};