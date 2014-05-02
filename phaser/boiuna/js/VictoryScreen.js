State.VictoryScreen = function(game){}
State.VictoryScreen.prototype = {
	preload:function(){
		game.load.image('victory-screen', Config.dirVictoryScreen);
	},
	create:function(){
		var background = game.add.sprite(Config.xVictoryScreen, Config.yVictoryScreen, 'victory-screen');
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