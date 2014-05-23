var Dino = function()
{	
	this.score = 0;
	this.safetyMode = true;
	this.lives = 3;
	this.sprite;
	this.jumpButton
	this.cursors;
	this.playerSpeed = 250;
	this.jumpForce = 520;
	this.soundJump;
}
Dino.prototype.add = function(posX, posY)
{
	this.sprite = game.add.sprite(posX, posY ,'dino');
	game.physics.enable(this.sprite);
	this.sprite.anchor.setTo(0.4 ,0.5);
	this.sprite.smoothed = false; 
	this.sprite.animations.add('walk',[0,1,2,3,4,5,6,7],12,true);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.checkCollision.up = false;
	this.sprite.body.checkCollision.left = false;
	this.sprite.body.checkCollision.right = false;
	this.sprite.body.setSize(32,128,-4,-4);
	this.startSafetyMode();
	this.cursors = game.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.soundJump = game.add.audio('jump',soundLevel,false);
	this.hearts = game.add.group();
	this.hearts.fixedToCamera=true;
	for(var i =0; i<this.lives;i++)
		this.hearts.create(i*60,0, 'heart');
}

Dino.prototype.enableMovement = function () 
{
	this.sprite.body.velocity.x = 0;
	if(this.cursors.left.isDown)
	{
		this.sprite.body.setSize(32,128,-2,-4);
		this.sprite.scale.setTo(-1,1);
		this.sprite.animations.play('walk');		
		this.sprite.body.velocity.x = -this.playerSpeed;
	}
	else if(this.cursors.right.isDown)
		{
		this.sprite.body.setSize(32,128,-4,-4);
		this.sprite.scale.setTo(1,1);
		this.sprite.animations.play('walk');		
		this.sprite.body.velocity.x = this.playerSpeed;
		}
	else 
		if(this.sprite.body.blocked.down)
	{
		this.sprite.animations.stop();
		this.sprite.frame = 1;
	}
	if(this.sprite.body.velocity.y < 0)
		this.sprite.frame = 9;
		else if(this.sprite.body.velocity.y > 0)
		this.sprite.frame = 8;
}

Dino.prototype.enableJump = function()
{
	if (this.jumpButton.isDown && this.sprite.body.onFloor())
	{
		this.soundJump.play();
		this.sprite.body.velocity.y = -this.jumpForce;
	}
}

Dino.prototype.smash = function(dino,target)
{
	target.kill();
	switch(target.tag)
	{
		case 'car': this.score += 15;
		break;
		case 'human': this.score += 5;
		break;
		default : this.score +=1; 
	}
};

Dino.prototype.takeDamage = function()
{
	if(this.hearts.countLiving()!=0)
	{
		if(!this.safetyMode)
		{
			this.startSafetyMode();
			this.hearts.getTop().destroy();
		}
	}
	else
		this.callGameOver();
};

Dino.prototype.callGameOver = function()
{
	//this.score = 0;
	this.sprite.kill();
	game.add.sprite(game.camera.x+250, game.camera.y+150,'gameOver');
	game.input.onDown.addOnce(function() {
	game.state.restart();
        },this)
};

Dino.prototype.startSafetyMode = function()
{
	this.safetyMode = true
	this.sprite.alpha= 0;
	this.safetyTween = game.add.tween(this.sprite).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0, 10, true);
	this.safetyTween.onComplete.add(function(){this.safetyMode = false},this);
}
