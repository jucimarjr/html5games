State.Menu = function (game){};
State.Menu.prototype = { 
	preload: function(){
		game.load.image('menu-background',  Config.menu.dir);
		game.load.spritesheet('button-play', Config.menu.buttonPlay.dir,Config.menu.buttonPlay.width,Config.menu.buttonPlay.height);
		game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir,Config.menu.buttonCredits.width,Config.menu.buttonCredits.height);
	},	
	create: function (){
		var background = game.add.sprite(Config.menu.x, Config.menu.y, 'menu-background');
		buttonPlay = game.add.button(Config.menu.buttonPlay.x, Config.menu.buttonPlay.y, 'button-play', clickPlay, this, 0, 1, 2, 3);
		buttonPlay.anchor.setTo(Config.menu.buttonPlay.anchor.x, Config.menu.buttonPlay.anchor.y);
		buttonCredits = game.add.button(Config.menu.buttonCredits.x, Config.menu.buttonCredits.y, 'button-credits', clickCredits, this, 0, 1, 2, 3);
		buttonCredits.anchor.setTo(Config.menu.buttonCredits.anchor.x, Config.menu.buttonCredits.anchor.y);
	}
}
function clickPlay(){
	game.state.start('Game');
}
function clickCredits(){
	game.state.start('Credits');
}