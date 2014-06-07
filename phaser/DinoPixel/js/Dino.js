var Dino = function()
{};
Dino.prototype.add = function(posX, posY)
{	

	this.sfxEat = game.add.audio('smash',soundLevel,false);
	this.sfxlifeUp = game.add.audio('lifeUp',soundLevel,false);
	this.sfxTakeDamage = game.add.audio('takeDamage',soundLevel,false);
	this.sfxFoodDown = game.add.audio('foodDown',soundLevel,false);
	this.score = 0;
	this.enemysKiled = 0;
	this.killsToCallTank = 0;
	this.killsNeeded = 45;
	this.foodCount=0;
	this.safetyMode = false;
	this.lives = 3;
	this.food = 5;
	this.playerSpeed = 250;
	this.jumpForce = 520;
	this.timeToAtack = 0;
	this.atackDelay = 400;
	this.onAtackMode = false;
	this.isAlive = true;
	this.sprite = game.add.sprite(posX, posY ,'dino');
	game.physics.enable(this.sprite);
	this.sprite.body.maxVelocity.y = 800;
	this.sprite.anchor.setTo(0.4 ,0.5);
	this.sprite.smoothed = false; 
	this.sprite.animations.add('stoped',[1],1);
	this.sprite.animations.add('walk',[1,2,3,4,5,6,7,0],12,true);
	this.sprite.animations.add('atack',[10,11,1],10);
	this.dieAnim = this.sprite.animations.add('die',[12,13,14,15,16,17,18],10);
	this.dieAnim.onComplete.add(function(){this.callGameOver();},this);
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
	this.hungryTimeDelay=10000;
	this.hungryTime = game.time.now + this.hungryTimeDelay;
	this.foods = game.add.group();
	this.foods.fixedToCamera = true;
	for(var i = 0;i< this.food;i++)
		this.foods.create(i*60,48,'food');
	this.hearts = game.add.group();
	this.hearts.fixedToCamera=true;
	for(var i =0; i<this.lives;i++)
		this.hearts.create(i*64,0, 'heart');
};

Dino.prototype.update = function()
{
	this.regulateFood();
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
		if(this.sprite.body.velocity.y==0 && this.sprite.body.velocity.x==0 && this.sprite.animations.currentAnim.name!= 'atack' && this.sprite.animations.currentAnim.name!= 'die')
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
	var p;
	if(target.tag != 'human')
		dino.body.velocity.y = -this.jumpForce/1.2;
	target.body.velocity.y = -150;
	switch(target.job)
	{
		case 'normalCar':  
		p = 12; 
		this.score += p; 
		break;
		case 'people':
			splashBlood1(target.x,target.y);
		p = 5; 
		this.score += p; 
		break;
		case 'shooter' : 
			splashBlood1(target.x,target.y);
		p = 12;
		this.score += p;
		splashBlood1(target.x,target.y);
		break;
		case 'bomber' :
			splashBlood1(target.x,target.y);
		p = 16;
		this.score += p;
		break;
		case 'sniper' :
			splashBlood1(target.x,target.y);
		p = 20;
		this.score += p;
		default : this.score +=1; 
	}
	this.displayPoint(p);
	target.takeDamage();
};

Dino.prototype.bit = function(dino,target)
{
	if(this.onAtackMode)
	{	
		var p;
		switch(target.tag)
		{
			case 'human': 
				splashBlood2(target.x,target.y);
				this.replaceFood();
				this.sfxEat.play();
				p = 5;
				this.score += p; 
			break;
			case 'shooter' : 
				splashBlood2(target.x,target.y);
				this.replaceFood();
				this.sfxEat.play();
				p = 10;
				this.score += p;
			break;
			case 'bomber' : 
				splashBlood2(target.x,target.y);
				this.replaceFood();
				this.sfxEat.play();
				p = 15;
				this.score += p;
			break;
			case 'sniper' : 
				splashBlood2(target.x,target.y);
				this.replaceFood();
				this.sfxEat.play();
				p = 17;
				this.score += p;
			break;
		}
		this.displayPoint(p);
		target.takeDamage();
	}
};

Dino.prototype.takeDamage = function(dino, target)
{
	if(!this.safetyMode)
	{
		this.startSafetyMode();
		if(target.isTank)
		{
			explode(dino.x,target.y);
			explode(dino.x+100,target.y);
			explode(dino.x-100,target.y);
			explode(dino.x,target.y-100);
			explode(dino.x,target.y+100);
		}
		if(target.isBomber)
			explode(dino.x,target.y);
		for(var i = 0; i < target.damage; i++)
		{
			if(this.hearts.countLiving()!==0)
				this.hearts.getTop().destroy();
		}
		if(this.hearts.countLiving()==0)
				this.sprite.animations.play('die');
	}
	target.kill();
};

Dino.prototype.hitByCar = function(dino,target)
{	
	if(this.hearts.countLiving()!==0 && !target.destroyed)
	{
		this.startSafetyMode();
		this.hearts.getTop().destroy();
	}
	if(this.hearts.countLiving()==0 && this.isAlive ) 
	{
		this.isAlive = false;
		this.sprite.animations.play('die');
	}
	target.runOver(this);	
};

Dino.prototype.callGameOver = function()
{
	var gO = game.add.sprite(game.camera.width/2-200, game.camera.height/2-50,'scoreTable');
	gO.fixedToCamera = true;
	track.stop();
	var score = game.add.text(game.camera.width/2 - 50, game.camera.height/2 -30, this.score,style6);
	score.fixedToCamera = true;
	var s = game.add.audio('lose',soundLevel,false);
	s.play();
	game.input.onDown.addOnce(function() {
	game.state.restart();
        },this);
};

Dino.prototype.startSafetyMode = function()
{
	if(this.hearts.countLiving()>1)
	{
		this.sfxTakeDamage.play();
		this.safetyMode = true;
		this.sprite.alpha= 0;
		var safetyTween = game.add.tween(this.sprite).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 10, true);
		safetyTween.onComplete.add(function(){this.safetyMode = false;},this);
	}
};

Dino.prototype.displayPoint = function(point)
{
	var txt = game.add.text(this.sprite.x, this.sprite.y, point, style3);
	var txt2 = game.add.text(this.sprite.x, this.sprite.y, point, style4);
	txt2.alpha = 0;
	game.add.tween(txt).to( { y:txt.y - 300 }, 4000, Phaser.Easing.Linear.None, true, 0, 0, true);
	game.add.tween(txt2).to( { y:txt.y - 300 },4000, Phaser.Easing.Linear.None, true, 0, 0, true);
	var blinkTween1 = game.add.tween(txt).to( { alpha:0 }, 50, Phaser.Easing.Linear.None, true, 0, 25, true);
	var blinkTween2 = game.add.tween(txt2).to( { alpha:1 }, 50, Phaser.Easing.Linear.None, true, 0, 25, true);
	blinkTween1.onComplete.add(function(){txt.destroy();});
	blinkTween2.onComplete.add(function(){txt.destroy();});
};

Dino.prototype.regulateFood = function()
{
	if (game.time.now > this.hungryTime)
	{
		if(this.foods.countLiving()!=0)
		{
			this.foods.getTop().destroy();
			this.sfxFoodDown.play();
		}
		else
			if(this.hearts.countLiving()!=0)
			{
				this.sfxTakeDamage.play(); 
				this.hearts.getTop().destroy();
			}
			if(this.hearts.countLiving()==0) 
				this.sprite.animations.play('die');
		this.hungryTime = game.time.now + this.hungryTimeDelay;
	}
};
Dino.prototype.replaceFood = function()
{
	this.foodCount += 1;
	if(this.hearts.countLiving()<5 && this.foodCount >=5)
	{
		this.hearts.create(this.hearts.countLiving() * 64,0, 'heart');
		this.sfxlifeUp.play();
		this.foodCount = 0;
	}
	if(this.foods.countLiving()<5)
		this.foods.create(this.foods.countLiving() * 60,48, 'food');
	this.hungryTime = game.time.now + this.hungryTimeDelay;
};