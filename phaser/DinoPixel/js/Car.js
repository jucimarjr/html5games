var Car = function()
{
	this.sprite;
	this.stoped = true;
	this.moveTimer = 0;
	this.destroyed = false;
};

Car.prototype.addWithSpeed = function(posX, posY, speed)
{
	this.speed = 100;
	this.sprite = game.add.sprite(posX, posY, 'carTexture',game.rnd.integerInRange(0,3));
	game.physics.enable(this.sprite);
	this.sprite.anchor.setTo(0.5 ,0.5);
	this.sprite.body.tilePadding.y = 100;
	this.sprite.body.tilePadding.x = 100;
	this.sprite.body.velocity.x = speed;
	if(speed<0)
		this.sprite.scale.setTo(-1,1);
	this.sprite.tag='car';
	
	this.sprite.runOver = function(dino)
	{
		if(!this.destroyed)
		{
			dino.takeDamage();
			this.destroyed = true;
			this.body.velocity.y = -300;
			this.body.velocity.x = 0;
			this.frame += 4; 
			var tween = game.add.tween(this).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 3000, 0, true);
			tween.onComplete.add(function()
					{
						this.destroy();
					},this);
		}
	};
	
	this.sprite.takeDamage = function()
	{
		this.body.velocity.y = -300;
		game.add.tween(this.body.velocity).to( { x: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, true);
		if(!this.destroyed)
		{
			this.destroyed = true;
			this.frame += 4; 
		}
		var tween = game.add.tween(this).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 3000, 0, true);
		tween.onComplete.add(function()
				{
					this.destroy();
				},this);
	};
}; 