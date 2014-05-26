var Dino = function()
{	};
Dino.prototype.add = function(posX, posY)
{
	this.score = 0;
	this.safetyMode = false;
	this.lives = 3;
	this.playerSpeed = 250;
	this.jumpForce = 520;
	this.timeToAtack = 0;
	this.atackDelay = 300;
	this.onAtackMode = false;
	
	this.sprite = game.add.sprite(posX, posY ,'dino');
	game.physics.enable(this.sprite);
	this.sprite.anchor.setTo(0.4 ,0.5);
	this.sprite.smoothed = false; 
	this.sprite.animations.add('stoped',[1],1);
	this.sprite.animations.add('walk',[1,2,3,4,5,6,7,0],12,true);
	this.sprite.animations.add('atack',[10,11,1],10);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.checkCollision.up = false;
	this.sprite.body.checkCollision.left = false;
	this.sprite.body.checkCollision.right = false;
	this.sprite.body.setSize(32,128,-4,-4);
	this.sprite.body.tilePadding.y = 100;
	this.sprite.body.tilePadding.x = 100;
	this.cursors = game.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.atackButton = game.input.keyboard.addKey(Phaser.Keyboard.X);
	this.soundJump = game.add.audio('jump',soundLevel,false);
	this.hearts = game.add.group();
	this.hearts.fixedToCamera=true;
	for(var i =0; i<this.lives;i++)
		this.hearts.create(i*60,0, 'heart');
};

Dino.prototype.update = function()
{
	this.enableAtack();
	this.enableJump();
	this.enableMovement();
};
Dino.prototype.enableMovement = function () 
{
	this.sprite.body.velocity.x = 0;
	if(this.cursors.left.isDown && !this.onAtackMode)
	{
		this.sprite.body.setSize(32,128,-2,-4);
		this.sprite.scale.setTo(-1,1);
		this.sprite.animations.play('walk');		
		this.sprite.body.velocity.x = -this.playerSpeed;
	}
	else if(this.cursors.right.isDown && !this.onAtackMode)
		{
		this.sprite.body.setSize(32,128,-4,-4);
		this.sprite.scale.setTo(1,1);
		this.sprite.animations.play('walk');		
		this.sprite.body.velocity.x = this.playerSpeed;
		}
	else 
		if(this.sprite.body.velocity.y==0 && this.sprite.body.velocity.x==0 && this.sprite.animations.currentAnim.name!= 'atack')
	{
		this.sprite.animations.play('stoped');
	}
	if(this.sprite.body.velocity.y < 0)
		this.sprite.frame = 9;
		else if(this.sprite.body.velocity.y > 0)
		this.sprite.frame = 8;
};

Dino.prototype.enableJump = function()
{
	if (this.jumpButton.isDown && this.sprite.body.onFloor() && !this.onAtackMode)
	{
		this.soundJump.play();
		this.sprite.body.velocity.y = -this.jumpForce;
	}
};

Dino.prototype.enableAtack = function()
{
	if(this.atackButton.isDown && game.time.now >= this.timeToAtack && this.sprite.body.onFloor())
	{	
		if(this.sprite.scale.x == -1)
			this.sprite.body.setSize(96,128,-50,-4);
		else
			this.sprite.body.setSize(96,128,30,-4);
		this.onAtackMode = true;
		this.sprite.animations.stop();
		this.sprite.animations.play('atack');
		this.timeToAtack = game.time.now + this.atackDelay;
	}
	if(game.time.now >= this.timeToAtack) 
		this.onAtackMode = false;
};

Dino.prototype.smash = function(dino,target)
{
	dino.body.velocity.y = -this.jumpForce/1.2;
	target.body.velocity.y = -150;
	switch(target.tag)
	{
		case 'car': this.score += 15;
		break;
		case 'human': this.score += 5;
		break;
		default : this.score +=1; 
	}
	target.takeDamage();
};

Dino.prototype.bit = function(dino,target)
{
	if(this.onAtackMode)
	{	
		switch(target.tag)
		{
			case 'human': this.score += 15;
			break;
			default : this.score +=1; 
		}
		target.takeDamage();
	}
};

Dino.prototype.takeDamage = function(dino, target)
{
	if(!this.safetyMode)
	{
		this.startSafetyMode();
		this.hearts.getTop().destroy();
		if(this.hearts.countLiving()==0)
			this.callGameOver();
	}
};

Dino.prototype.hitByCar = function(dino,target)
{	
	target.runOver(this);	
};

Dino.prototype.callGameOver = function()
{
	this.sprite.kill();
	game.add.sprite(game.camera.x+250, game.camera.y+150,'gameOver');
	game.input.onDown.addOnce(function() {
	game.state.restart();
        },this);
};

Dino.prototype.startSafetyMode = function()
{
	this.safetyMode = true;
	this.sprite.alpha= 0;
	this.safetyTween = game.add.tween(this.sprite).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0, 10, true);
	this.safetyTween.onComplete.add(function(){this.safetyMode = false;},this);
};
