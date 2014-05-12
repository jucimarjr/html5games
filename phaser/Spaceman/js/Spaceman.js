var Spaceman = function(game, x, y, sprite){
	Phaser.Sprite.call(this, game, x, y, sprite, 0);
	this.anchor.setTo(0.7,0.6);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	//this.sprite.body.collideWorldBounds = true;
	this.outOfBoundsKill = true;
	this.smoothed = true;
	this.body.setSize(90,25,10,0); 
	this.animations.add('flying',[0,1,2,3,4,3,2,1,0],5,true);
	this.animations.play('flying');
	game.add.existing(this);
	this.fire1 = game.add.sprite(this.x, this.y, 'fire1');
	this.fire1.anchor.setTo(0.7,0.6);
	game.physics.enable(this.fire1, Phaser.Physics.ARCADE); // abilita a fisica no fogo p/ ele poder acompanhar o personagem
	//this.fire1.body.collideWorldBounds = true;
	this.fire1.smoothed = true;
	this.fire1.animations.add('flying',[0,1,2,1],15,true);
	this.fire1.animations.play('flying');
	//return this;
	this.upSpeed = 25;
}

Spaceman.prototype = Object.create(Phaser.Sprite.prototype);
Spaceman.prototype.constructor = Spaceman;

Spaceman.prototype.create = function(){
	
};

Spaceman.prototype.update = function(){
	this.fire1.angle = this.angle;
	//
	if (game.input.activePointer.isDown)
	{
		this.fire1.body.velocity.y -= this.upSpeed;
		this.body.velocity.y -= this.upSpeed;
	}
	this.angle = this.body.velocity.y * 0.02
	this.fire1.angle = this.fire1.body.velocity.y * 0.02
};

Spaceman.prototype.resetSpaceman = function(){
	this.reset(350,200);
	this.fire1.reset(350,200);
};