State.DefeatScreen = function(game){}
State.DefeatScreen.prototype = {
	preload:function(){
		game.load.image('defeat-screen', Config.dirDefeatScreen);
	},
	create:function(){
		var background = game.add.sprite(Config.xDefeatScreen, Config.yDefeatScreen, 'defeat-screen');
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