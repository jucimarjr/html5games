var Human = function()
{
	this.sprite;
	this.speed = 25;
	this.stoped = true;
	this.moveTimer = 0;
	this.jumpTimer = 0;
}

Human.prototype.add = function(posX, posY)
{
	this.sprite = game.add.sprite(posX, posY, 'humanTexture');
	this.sprite.frame = game.rnd.integerInRange(0,6);
	this.sprite.smoothed = false; 
	game.physics.enable(this.sprite);
	this.sprite.anchor.setTo(0.5 ,0.5);
	this.sprite.tag='human';
}

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
		this.sprite.body.velocity.y = -85;
	}
}