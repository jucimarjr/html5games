var Credits = function()
{
	this.creditsScreenPath = 'assets/screens/credits.png';
}
Credits.prototype.preload = function(){
    game.load.image('creditsScreen', this.creditsScreenPath);
};

Credits.prototype.create = function() {
    var creditsScreen = game.add.sprite(0, 0, 'creditsScreen');
		
    game.input.onDown.add(function() {
        var fadeout = game.add.tween(creditsScreen).to( { alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        fadeout.onComplete.add(function() {
            game.state.start('menu', Menu);
        });
    });
};