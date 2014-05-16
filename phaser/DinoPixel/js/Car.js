var Car = function()
{
	this.sprite;
	this.stoped = true;
	this.moveTimer = 0;
}

Car.prototype.addWithSpeed = function(posX, posY, texture, speed)
{
	this.speed = 100;
	this.sprite = game.add.sprite(posX, posY, texture);
	game.physics.enable(this.sprite);
	this.sprite.anchor.setTo(0.5 ,0.5);
	this.sprite.body.velocity.x = speed;
	this.sprite.frame = game.rnd.integerInRange(0,3);
	if(speed<0)
		this.sprite.scale.setTo(-1,1);
} 
