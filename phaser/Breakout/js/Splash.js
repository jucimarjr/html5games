var Splash = function()
{	
	this.ludusSplashImage = 'assets/screens/ludus.png';
	this.gameSplashImage = 'assets/screens/breakout.png';
}

Splash.prototype.preload = function()
{
	game.load.image('ludusSplash',this.ludusSplashImage);
	game.load.image('gameSplash',this.gameSplashImage);
}

Splash.prototype.create = function()
{
	var fundo = game.add.sprite(0,0,'ludusSplash');
	fundo.alpha = 0;
	var fadeIn = game.add.tween(fundo).to({alpha : 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, true );
	fadeIn.onComplete.add(function(){
		var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 2000, 0, true);
		fadeout.onComplete.add(function(){
			fundo.loadTexture('gameSplash');
			var fadeIn = game.add.tween(fundo).to({alpha : 1}, 300, Phaser.Easing.Linear.None, true, 0, 0, true );
			fadeIn.onComplete.add(function(){
				var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 2000, 0, true);
				fadeout.onComplete.add(function(){
					game.state.start('menu');
				});
			});
			
		});
	});
}