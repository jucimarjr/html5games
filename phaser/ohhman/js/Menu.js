var Menu = {};

Menu = function (game) {
    this.menuImage = 'assets/screenshots/menu_600-800.png';
    this.creditsImage = 'assets/screenshots/credits_600-800.png';   
};

Menu.prototype.preload = function(){
    game.load.image('menu', this.menuImage);
};

Menu.prototype.create = function() {	
	var fundo = game.add.sprite(0, 0, 'menu');
	fundo.alpha = 0;
	
	var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
	setTimeout(function() {
		var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		fadeout.onComplete.add(function() {
			fundo.anchor.setTo(0.5,0.5);
			fundo.x = game.width/2;
			fundo.y = game.height/2;
			fundo.loadTexture('credits');			
			var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
			setTimeout(function() {
				var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
				fadeout.onComplete.add(function(){
					game.state.start('highScores', HighScores);
				});
			}, 2500);
		});
	}, 3000);
};