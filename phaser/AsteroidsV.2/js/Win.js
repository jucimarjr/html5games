Win = function (game) {
    this.game = game;
};

Win.prototype.preload = function() {
    game.load.image('winMsg', 'assets/tests/win.png');
};

Win.prototype.create = function() {
	var fundo = game.add.sprite(0, 0, 'winMsg');
	fundo.alpha = 0;
	
	var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
	setTimeout(function() {
		var fadeout = game.add.tween(fundo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		fadeout.onComplete.add(function() {
				game.state.start('menu', Menu);
			}, 2500);
	}, 3000);
};