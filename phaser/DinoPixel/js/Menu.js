var Menu = function()
{
	this.playButton;
	this.creditsButton;
	this.playPath = 'assets/screens/play.png';
	this.creditsPath= 'assets/screens/cerdits.png';
}

Menu.prototype.preload = function()
{
	game.load.image('playButton', this.playPath, 434, 102);
	game.load.image('creditsButton', this.creditsPath, 606, 98);
	game.load.audio('playsound', 'assets/sfx/menusound.wav');
	game.load.audio('creditssound', 'assets/sfx/menusoundluan.wav');
}

Menu.prototype.create = function()
{
	var fadeout;
	this.playButton = game.add.button(game.world.width/2 - 217, game.world.height/2 - 150, 'playButton', this.goGame, this, 1,0);
	this.creditsButton = game.add.button(game.world.width/2 - 303, game.world.height/2 +60, 'creditsButton', this.goCredits, this, 1,0);
	
}

Menu.prototype.goGame = function()
{
	var playsound = game.add.audio('playsound',5);
	playsound.play();
	this.fadeOut();
	fadeout.onComplete.add(function()
	{ 
		game.state.start('game')
	});

}

Menu.prototype.goCredits = function()
{
	var playsound = game.add.audio('creditssound',5);
	playsound.play();
	this.fadeOut();
	fadeout.onComplete.add(function()
	{ 
		game.state.start('credits')
	});

}

Menu.prototype.fadeOut = function()
{
	fadeout = fadeout = game.add.tween(this.playButton).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
	fadeout = fadeout = game.add.tween(this.creditsButton).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
}