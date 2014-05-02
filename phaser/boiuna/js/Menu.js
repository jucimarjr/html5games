State.Menu = function (game){};

State.Menu.prototype = { 

	preload: function(){
	
		game.load.image('menu-background',  Config.dirMenuBackground);
		game.load.spritesheet('button-play', Config.dirButtonPlay,Config.widthButtonPlay,Config.heightButtonPlay);
		game.load.spritesheet('button-credits', Config.dirButtonCredits,Config.widthButtonCredits,Config.heightButtonCredits);
		
	},
	
	create: function (){
		buttonPlay = game.add.button(Config.xButtonPlay, Config.yButtonPlay, 'button-play', clickPlay, this, 0, 1, 2, 3);
		buttonPlay.anchor.setTo(0.5, 0.5);
		buttonCredits = game.add.button(Config.xButtonCredits, Config.yButtonCredits, 'button-credits', clickCredits, this, 0, 1, 2, 3);
		buttonCredits.anchor.setTo(0.5, 0.5);
	}
}
function clickPlay(){
	game.state.start('Game');
}

function clickCredits(){
	game.state.start('Credits');
}