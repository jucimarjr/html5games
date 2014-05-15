var Rock = function(game,posX,posY)
{
	Phaser.Sprite.call(this, game, posX, posY, 'rock');
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.outOfBoundsKill = true;
	this.anchor.setTo(0.5,0.5);
	this.frame = game.rnd.integerInRange(0,4);
	this.body.setSize(46,46,4,4);
	this.body.allowGravity = false;
	this.body.angularVelocity = game.rnd.integerInRange(100,250);
	this.body.velocity.x= -600;
	game.add.existing(this);
};

Rock.prototype = Object.create(Phaser.Sprite.prototype);
Rock.prototype.constructor = Rock;