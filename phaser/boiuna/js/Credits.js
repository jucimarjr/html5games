State.Credits = function(game){}
State.Credits.prototype = {
	preload: function(){
		game.load.image('credits', Config.dirCredits);
	},
	create: function(){
		var background = game.add.sprite(Config.xCredits, Config.yCredits, 'credits');
		background.inputEnabled = true;
		background.events.onInputDown.add(onClick, this);
	},
	update: function(){
		if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			game.state.start('Menu');
		}
	}
}
function onClick(){
	game.state.start('Menu');
}