HowToPlay = function (game) {
    this.game = game;
    this.screenName = 'HowToPlayScreen';
    this.image = 'assets/screenshots/howtoplay.png';
};

HowToPlay.prototype.preload = function(){
    game.load.image(this.screenName, this.image);
};

HowToPlay.prototype.create = function() {
    var bg = game.add.sprite(0, 0, this.screenName);
	bg.anchor.setTo(0.5,0.5);
	bg.x = game.width/2;
	bg.y = game.height/2;
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