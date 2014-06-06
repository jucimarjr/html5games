var Enemy = function(player,colliderLayer,sprite,bahavior,job)
{
	this.create(player,colliderLayer,sprite,bahavior,job);
};
Enemy.prototype.create = function(player,colliderLayer,sprite,bahavior,job)
{
	this.sfxTiro = game.add.audio('inimigoTiro',soundLevel,false);
	this.sfxTiroTank = game.add.audio('tiroTank',soundLevel,false);
	this.colliderLayer = colliderLayer;
	this.sprite = sprite;
	this.sprite.outOfBoundsKill = true;
	this.sprite.f = 0;
	this.sprite.smoothed = false; 
	game.physics.enable(this.sprite);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.tilePadding.y = 100;
	this.sprite.body.tilePadding.x = 100;
	this.sprite.anchor.setTo( 0.5,0.5);
	this.sprite.animations.add('shoot',[0,1,2,3],12,false);
	this.sprite.player = player ;
	this.sprite.isAlive = true;
	this.canSpawn = false;
	this.sprite.job = job;
	this.sprite.tag='human';
	switch(this.sprite.job)
		{
			case 'shooter':
				this.sprite.frame = 3;
				this.distance = game.rnd.integerInRange(0,500);
				this.bulletTexture = 'bullet1';
				this.bulletSpeed = 200;
				this.speed = game.rnd.integerInRange(100,250);
				this.fireRate = 6000;
				this.damage = 1;
			break;
			case 'sniper': 
				this.sprite.frame = 3;
				this.distance =game.rnd.integerInRange(1000,1500);
				this.bulletTexture = 'bullet1';
				this.bulletSpeed = 300;
				this.fireRate = 5000;
				this.damage = 2;
				break;
			case 'bomber': 
				this.sprite.frame = 3;
				this.distance = game.rnd.integerInRange(0,600);
				this.bulletTexture = 'bullet2';
				this.bulletSpeed = 120;
				this.speed = game.rnd.integerInRange(100,200);
				this.fireRate = 6500;
				this.damage = 3;
				this.isBomber = true;
			break;
			case 'tank': 
				this.sprite.sfxHitCar = game.add.audio('hitCar',soundLevel,false);
				this.sprite.tag='machine';
				this.sprite.hp = 20;
				this.distance = 350;
				this.sprite.frame = 4;
				this.sprite.animations.add('tankShoot',[0,1,2,3,4],12,false);
				this.bulletTexture = 'bullet3';
				this.bulletSpeed = 300;
				this.speed = 150;
				this.fireRate = 6000;
				this.damage = 4;
				this.isTank = true;
				this.sprite.anchor.setTo( 0.75,0.2);
				this.sprite.body.setSize(190,90,50,35);
				this.sprite.isTank = this.isTank;
			break;
			case 'police': 
				this.sprite.sfxHitCar = game.add.audio('hitCar',soundLevel,false);
				this.sprite.tag='machine';
				this.bulletTexture = 'bullet3';
				this.sprite.hp = 3;
				this.distance = 370;
				this.sprite.animations.add('blink',[0,1],15,true);
				this.sprite.animations.play('blink');
				this.speed = 400;
			break;
			case 'truck': 
				this.sprite.sfxHitCar = game.add.audio('hitCar',soundLevel,false);
				this.sprite.tag='machine';
				this.sprite.body.checkCollision.left = false;
				this.sprite.body.checkCollision.right = false;
				this.bulletTexture = 'bullet3';
				this.sprite.hp = 2;
				this.distance = 370;
				this.sprite.animations.add('blink',[0],15,true);
				this.sprite.animations.play('blink');
				this.speed = 300;
			break;
		}
	this.bullet;
	this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.createMultiple(50, this.bulletTexture);
		this.bullets.setAll('checkWorldBounds', true);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.callAll('animations.add', 'animations', 'blink', [0, 1, 2], 10, true);
		this.bullets.callAll('animations.play', 'animations', 'blink');
	this.nextFire = game.time.now + game.rnd.integerInRange(1000,3000);
	this.stoped = true;
	this.moveTimer = 0;
	this.jumpTimer = 0;
	this.bahavior = bahavior;
	
	this.sprite.takeDamage = function()
	{
		if(this.tag != 'machine')
		{
			this.isAlive = false;
			this.destroy(); 
			this.player.enemysKiled++;
			this.player.killsToCallTank++;
		}
		if (this.tag == 'machine' && !this.safetyMode)
		{
			if (this.hp == 0)
				this.killMachine();
			else
				switch(this.job)
				{
				case 'tank':
					this.startSafetyMode();
					this.sfxHitCar.play();
					particlesExplodeSmall(this.x,this.y);
					this.hp -=1;
					var p = 5;
					this.player.displayPoint(p);
					this.player.score+=p;
				break;
				case 'police':
					this.startSafetyMode();
					this.sfxHitCar.play();
					particlesExplodeSmall(this.x,this.y);
					this.hp -=1;
					var p = 10;
					this.player.displayPoint(p);
					this.player.score+=p;
					this.animations.stop();
					this.f += 1;
					this.frame = 1 + this.f;
				break;
				case 'truck':
					this.startSafetyMode();
					this.sfxHitCar.play();
					particlesExplodeSmall(this.x,this.y);
					this.hp -=1;
					var p = 10;
					this.player.displayPoint(p);
					this.player.score+=p;
					this.animations.stop();
					this.f += 1;
					this.frame = this.f;
				break;
				}
		}
	};
	
	this.sprite.killMachine = function()
	{
		this.player.enemysKiled++;
		this.player.killsToCallTank++;
		
		var p;
		switch(this.job)
		{
			case 'tank':p = 200;
			break;
			case 'police':p = 35;
			break;
			case 'truck':p = 50;
			break;
		}
		this.player.displayPoint(p);
		this.player.score +=p;
		explode(this.x,this.y);
		explode(this.x+100,this.y);
		explode(this.x-100,this.y);
		explode(this.x,this.y-100);
		explode(this.x,this.y+100);
		this.destroy();
		this.isAlive = false;
	};
	this.sprite.startSafetyMode = function()
	{
		if(this.hp>0)
		{
			this.safetyMode = true;
			this.alpha= 0;
			var safetyTween = game.add.tween(this).to( { alpha: 1 }, 75, Phaser.Easing.Linear.None, true, 0, 4, true);
			safetyTween.onComplete.add(function(){this.safetyMode = false;},this);
		}
	};
};
Enemy.prototype.update = function(target,Game)
{
	if(this.sprite.player.hearts.countLiving()!=0)
		game.physics.arcade.overlap(this.sprite.player.sprite, this.bullets, this.sprite.player.takeDamage,null, this.sprite.player);
	if(this.sprite.isAlive)
	{
		switch(this.sprite.job)
		{
		case 'tank':this.tankAtack(target);
			break;
		case 'police': 
			break;
			case 'truck': 
			break;
		default :this.atack(target);
		}
		switch(this.bahavior)
		{
			case 'stayNormal' : this.stayNormal(target);
			break;
			case 'follow' : this.follow(target);
			break;
			case 'stayHold' : this.stayHold(target);
			break;
			case 'tankFollow' : this.tankFollow(target);
			break;
			case 'followAndSpawn': this.followAndSpawn(target,Game);
			break;
			default : this.stayHold(target);
			break;
		}
	}	
};
/*comportamentos*/
Enemy.prototype.stayNormal = function(target) //o human anda de um lado para o outro aleatoriamente.
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
	if(this.sprite.x < target.x)
			this.sprite.scale.setTo(-1,1);
		else if(this.sprite.x > target.x)
			this.sprite.scale.setTo(1,1);
	if( (this.sprite.body.onFloor()) && (this.sprite.body.velocity.x !=0))//fica pulando
	{
		this.sprite.body.velocity.y = -100;
	}
};

Enemy.prototype.follow = function(target) 
{
	if(this.sprite.x < target.x -this.distance )
		this.sprite.body.velocity.x = this.speed;
	else if(this.sprite.x > target.x + this.distance )
		this.sprite.body.velocity.x = -this.speed;
	else 
		this.sprite.body.velocity.x = 0;;
	if(this.sprite.x < target.x)
		this.sprite.scale.setTo(-1,1);
	else if(this.sprite.x > target.x)
		this.sprite.scale.setTo(1,1);
	if( (this.sprite.body.onFloor()) && (this.sprite.body.velocity.x !=0) && this.sprite.job != 'tank')//fica pulando
		this.sprite.body.velocity.y = -100;
};

Enemy.prototype.stayHold = function(target)
{
	if(this.sprite.x < target.x)
		this.sprite.scale.setTo(-1,1);
	else if(this.sprite.x > target.x)
		this.sprite.scale.setTo(1,1);
};

Enemy.prototype.followAndSpawn = function(target,Game)
{
	if(!this.canSpawn)
	{
		if(this.sprite.x < target.x -this.distance )
			this.sprite.body.velocity.x = this.speed;
		else if(this.sprite.x > target.x + this.distance )
			this.sprite.body.velocity.x = -this.speed;
		else 
		{
			this.sprite.body.velocity.x = 0;
			this.canSpawn = true;
			switch(this.sprite.key)
			{
			case 'truck':
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x+100,this.sprite.y,'soldier1'),'stayNormal','shooter');
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x-100,this.sprite.y,'soldier1'),'stayNormal','shooter');
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x,this.sprite.y,'soldier1'),'stayNormal','shooter');
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x+200,this.sprite.y,'soldier2'),'stayNormal','bomber');
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x-200,this.sprite.y,'soldier2'),'stayNormal','bomber');
			break;
			case 'specialOpsCar':
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x+100,this.sprite.y,'specialOps1'),'stayNormal','shooter');
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x,this.sprite.y,'specialOps1'),'stayNormal','shooter');
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x+200,this.sprite.y,'specialOps2'),'stayNormal','bomber');
			break;
			case 'policeCar':
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x+80,this.sprite.y,'policeMan'),'stayNormal','shooter');
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x-80,this.sprite.y,'policeMan'),'stayNormal','shooter');
				Game.objectEnemy[Game.objectEnemy.length] = new Enemy(Game.player,Game.layer4,Game.enemys.create(this.sprite.x,this.sprite.y,'policeMan'),'stayNormal','shooter');
				break;
			}
		}
		if(this.sprite.x < target.x)
			this.sprite.scale.setTo(1,1);
		else if(this.sprite.x > target.x)
			this.sprite.scale.setTo(-1,1);
	}
};

Enemy.prototype.atack = function(target)
{
	 if (game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
		this.sprite.animations.play('shoot');
        this.nextFire = game.time.now + this.fireRate;
        this.sfxTiro.play();
        this.bullet = this.bullets.getFirstDead();
        this.bullet.damage = this.damage;
        this.bullet.isBomber = this.isBomber;
		this.bullet.body.allowGravity = false;
		this.bullet.reset(this.sprite.x , this.sprite.y);

       game.physics.arcade.moveToXY(this.bullet,target.x,target.y+game.rnd.integerInRange(-target.height/2,target.height/2),this.bulletSpeed);
    }
};

Enemy.prototype.tankAtack = function(target)
{
	 if (game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
		this.sprite.animations.play('tankShoot');
        this.nextFire = game.time.now + this.fireRate;
        this.sfxTiroTank.play();
        this.bullet = this.bullets.getFirstDead();
        this.bullet.damage = this.damage;
        this.bullet.isTank = this.isTank;
		this.bullet.body.allowGravity = false;
		if(this.sprite.scale.x<0)
			this.bullet.reset(this.sprite.x+150 , this.sprite.y);
		else
			this.bullet.reset(this.sprite.x-150 , this.sprite.y);
       game.physics.arcade.moveToXY(this.bullet,target.x,target.y+game.rnd.integerInRange(-target.height/2,target.height/2),this.bulletSpeed);
    }
};

/*Enemy.prototype.tankFollow = function(target) 
{
	if(this.sprite.x < target.x -this.distance )
		this.sprite.body.velocity.x = this.speed;
	else if(this.sprite.x > target.x + this.distance )
		this.sprite.body.velocity.x = -this.speed;
	else 
		this.sprite.body.velocity.x = 0;
	if(this.sprite.x < target.x)
		this.sprite.scale.setTo(-1,1);
	else if(this.sprite.x > target.x)
		this.sprite.scale.setTo(1,1);
};*/
