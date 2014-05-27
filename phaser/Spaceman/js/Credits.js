Credits = function (game) {
    this.game = game;
};

Credits.prototype.create = function() {
    var bg = game.add.sprite(0, 0, 'creditScreen');
		
    game.input.onDown.add(function() {
        var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
        fadeout.onComplete.add(function() {
            game.state.start('menu', Menu);
        });
    });
    
    var keySelect = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	keySelect.onDown.add(function () {
		game.state.start('menu');
	});
};