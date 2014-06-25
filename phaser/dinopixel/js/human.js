var Human = function(sprite, bahavior)
{
	this.create(sprite,bahavior);
};
Human.prototype.create = function(sprite,bahavior)
{
	this.sprite = sprite;
	this.speed = 25;
	this.stoped = true;
	this.moveTimer = 0;
	this.jumpTimer = 0;
	this. bahavior = bahavior;
	this.sprite.smoothed = false; 
	game.physics.enable(this.sprite);
	this.sprite.body.tilePadding.y = 100;
	this.sprite.body.tilePadding.x = 100;
	this.sprite.anchor.setTo(0.5 ,0.5);
	this.sprite.tag='human';
	this.sprite.job = 'people';
	
	this.sprite.takeDamage = function()
	{
		this.destroy();
	};
};
Human.prototype.update = function()
{
	adjustePos(this);
	switch(this.bahavior)
	{
		case 'stayNormal' : this.stayNormal();
		break;
		case 'stayJumping' : this.stayJumping();
		break;
		default : this.stayNormal();
		break;
	}
};
//comportamentos
Human.prototype.stayNormal = function() //o human anda de um lado para o outro aleatoriamente.
{
	if(game.time.now > this.moveTimer)
	{
		var r = game.rnd.integerInRange(0,2);
		switch(r)
		{
			case 0: this.sprite.body.velocity.x = 0;
			break;
			case 1: this.sprite.body.velocity.x = this.speed;
			break;
			case 2:this.sprite.body.velocity.x = -this.speed;
			break;
		}
		this.moveTimer = game.time.now + 1000;
	}
	if( (this.sprite.body.onFloor()) && (this.sprite.body.velocity.x !=0))//fica pulando
	{
		this.sprite.body.velocity.y = -100;
	}
};

Human.prototype.stayJumping = function()
{
	if(this.sprite.body.onFloor())
	{
		this.sprite.body.velocity.y = -100;
	}
};
