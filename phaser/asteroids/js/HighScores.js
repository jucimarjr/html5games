var HowToPlay = {};

HowToPlay = function (game) {
    this.game = game;
    this.screenName = 'creditScreen';
    this.image = 'assets/screenshots/howToPlay_800-480.png';
};

HowToPlay.prototype.preload = function(){
    game.load.image(this.screenName, this.image);
};

HowToPlay.prototype.create = function() {
    var bg = game.add.sprite(0, 0, this.screenName);
		
    game.input.onDown.add(function() {
        var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
        fadeout.onComplete.add(function() {
            game.state.start('menu', Menu);
        });
    });
};