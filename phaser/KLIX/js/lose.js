Lose = function (game) {
    this.game = game;
};

Lose.prototype.preload = function() {
    game.load.image('loseMsg', 'assets/screenshots/lose.png');
};

Lose.prototype.create = function() {
	var fundo = game.add.sprite(0, 0, 'loseMsg');
	fundo.alpha = 0;/*
	fundo.anchor.setTo(0.5,0.5);
	fundo.x = game.world.width/2;
	fundo.y = 80;*/
	var msg = game.add.text(game.width/2 - 220, game.world.height/2, "YOUR SCORE: " + this.game.score, {
        font: "36px Vector Battle", fill: "#ffffff" , align: "right"
    });
	
	var keySelect = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	keySelect.onDown.add(function () {
		if(game.state.current == 'lose'){
			var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				game.state.start('highScoreInput', HighScoreInput);
			}, 2500);
		}
	});
	
	var fadein = game.add.tween(fundo).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, true);
	
	game.input.onDown.add(function() {
		if(game.state.current == 'lose'){
			var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				game.state.start('highScoreInput', HighScoreInput);
			});
		}
	});
};

