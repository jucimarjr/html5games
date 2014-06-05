var Car = function()
{};

Car.prototype.addWithSpeed = function(posX, posY,texture, speed)
{
	this.sprite;
	this.stoped = true;
	this.moveTimer = 0;
	this.destroyed = false;
	this.speed = 100;
	this.sprite = game.add.sprite(posX, posY, texture,game.rnd.integerInRange(0,3));
	game.physics.enable(this.sprite);
	this.sprite.outOfBoundsKill = true;
	this.sprite.anchor.setTo(0.5 ,0.5);
	this.sprite.body.tilePadding.y = 100;
	this.sprite.body.tilePadding.x = 100;
	this.sprite.body.velocity.x = speed;
	if(speed<0)
		this.sprite.scale.setTo(-1,1);
	this.sprite.tag='car';
	this.sprite.job = 'normalCar';
	
	this.sprite.runOver = function(dino)
	{
		if(!this.destroyed)
		{
			this.destroyed = true;
			this.body.velocity.y = -150;
			this.body.velocity.x = 0;
			this.frame += 4; 
			var tween = game.add.tween(this).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 3000, 0, true);
			tween.onComplete.add(function()
					{
						explode(this.x,this.y);
						this.destroy();
					},this);
		}
	};
	
	this.sprite.takeDamage = function()
	{
		
		if(!this.destroyed)
		{
			this.body.velocity.y = -150;
			game.add.tween(this.body.velocity).to( { x: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, true);
			this.destroyed = true;
			this.frame += 4; 
			var tween = game.add.tween(this).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 3000, 0, true);
		tween.onComplete.add(function()
				{
					explode(this.x,this.y);
					this.destroy();
				},this);
		}
		
	};
}; 