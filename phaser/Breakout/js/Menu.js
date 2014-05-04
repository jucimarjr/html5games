var Menu = function()
{
	this.playButton;
	this.creditsButton;
	this.playPath = 'assets/sprites/play.png';
	this.creditsPath= 'assets/sprites/credits.png';
}

Menu.prototype.preload = function()
{
	game.load.spritesheet('playButton', this.playPath, 434, 102, 2);
	game.load.spritesheet('creditsButton', this.creditsPath, 606, 98, 2);
}

Menu.prototype.create = function()
{
	var fadeout;
	this.playButton = game.add.button(game.world.width/2 - 217, game.world.height/2 - 150, 'playButton', this.goGame, this, 1,0);
	this.creditsButton = game.add.button(game.world.width/2 - 303, game.world.height/2 +60, 'creditsButton', this.goCredits, this, 1,0);
	
}

Menu.prototype.goGame = function()
{
	this.fadeOut();
	fadeout.onComplete.add(function()
	{ 
		game.state.start('game')
	});

}

Menu.prototype.goCredits = function()
{
	this.fadeOut();
	fadeout.onComplete.add(function()
	{ 
		game.state.start('credits')
	});

}

Menu.prototype.fadeOut = function()
{
	fadeout = fadeout = game.add.tween(this.playButton).to( { alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
	fadeout = fadeout = game.add.tween(this.creditsButton).to( { alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
}