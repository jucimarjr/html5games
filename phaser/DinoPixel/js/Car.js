var Car = function()
{
	this.sprite;
	this.speed = 100;
	this.stoped = true;
	this.moveTimer = 0;
}

Car.prototype.add = function(posX, posY, texture)
{
	this.sprite = game.add.sprite(posX, posY, texture);
	game.physics.enable(this.sprite);
	this.sprite.anchor.setTo(0.5 ,0.5);
}
