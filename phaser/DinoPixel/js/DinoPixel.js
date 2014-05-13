var human = function(game,posX,posY,humanSprt)
{
	this.game = game;
	this.sprite = null;
	this.posX = posX;
	this.posY = posY;
	this.humanSprt = humanSprt;
	this.game.physics.startSystem(Phaser.Game.ARCADE);
	
}
human.prototype.create = function()
{
	this.sprite = this.game.add.sprite(this.posX, this.posY, this.humanSprt);
	this.game.physics.enable(this.sprite);
	this.sprite.body.collideWorldBounds = true;
}
human.prototype.update = function () 
{
	//this.game.physics.arcade.overlap( player, this.sprite, this.smashHuman);
	this.game.physics.arcade.collide(this.sprite,layer);
}
human.prototype.smashHuman = function (player , sprite)
{
	sprite.kill();
} 