var Rock = function(posX,posY,speed)
{
	this.speed = speed;
	this.posX = posX;
	this.posY = posY;
	this.sprite;
}
 
 Rock.prototype.preload = function()
 {
	game.load.spritesheet('rock','assets/spritesheets/rocks.png',58,58,4);
 }
 
Rock.prototype.create = function()
{
	this.sprite = game.add.sprite(this.posX, this.posY, 'rock');
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.velocity.x = this.speed;
	this.sprite.body.allowGravity = false;
	this.sprite.outOfBoundsKill = true;
}

Rock.prototype.render = function()
{
	game.debug.body(this.sprite);
}