var HighScores = {};

HighScores = function (game) {
    this.highScoresImage = 'assets/screenshots/highScores_800-600.png';
    this.loseImage = 'assets/screenshots/lose_800-600.png';   
};

HighScores.prototype.preload = function(){
    game.load.image('highScores', this.highScoresImage);
    game.load.image('lose', this.loseImage);
};

HighScores.prototype.create = function() {	
	var fundo = game.add.sprite(0, 0, 'highScores');
	fundo.alpha = 0;
	
	var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
	setTimeout(function() {
		var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		fadeout.onComplete.add(function() {
			fundo.anchor.setTo(0.5,0.5);
			fundo.x = game.width/2;
			fundo.y = game.height/2;
			fundo.loadTexture('lose');			
			
			var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
			setTimeout(function() {
				var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
				fadeout.onComplete.add(function(){
					game.state.start('win', Win);
				});
			}, 2500);
			
		});
	}, 3000);
};