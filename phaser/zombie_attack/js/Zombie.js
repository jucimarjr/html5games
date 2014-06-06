var Zombie = function (index, game, classGame, person) {
	
	var x = 0;
	var y = 0;
	
	if(typeof person === 'undefined')
	{
		x = randX(game.rnd.integerInRange(0,2));
	    y = game.rnd.integerInRange(162,400);
	}
	else
	{
		x = person.x;
		y = person.y;
	}
	
	
    
    this.animation = 'zDown';
    this.game = game;
    this.alive = true;
    
    this.classGame = classGame;

    this.spriteSheetZombie = this.createSprite(x);
    this.spriteZombie = this.game.add.sprite(x, y,this.spriteSheetZombie);
    this.spriteZombie.z = 0;
    
    this.spriteZombie.animations.add(this.animation);
    this.spriteZombie.play(this.animation,7,true);

    this.spriteZombie.name = "zombie "+this.animation+" - "+index.toString();
    this.game.physics.enable(this.spriteZombie, Phaser.Physics.ARCADE);

    this.spriteZombie.body.enable = true;
    this.spriteZombie.body.bounce.setTo(1, 1);
    
    this.spriteZombie.inputEnabled=true;
    this.spriteZombie.body.velocity.x  = 0;
    
    this.spriteZombie.body.setSize(100,20, 0, zombieHeigth-10);
    this.spriteZombie.events.onInputDown.add(killZombie,this);
    
    this.spriteZombie.customSeparateX = true;
    this.spriteZombie.customSeparateY = true;
    
    this.block = false;
    
    
    this.setVelocity(this.spriteZombie);
    
    this.velocity0X = this.spriteZombie.body.velocity.x;
    this.velocity0Y = this.spriteZombie.body.velocity.y;
    
    this.spriteZombie.health = this.getHealth();
    
    this.spriteZombie.checkWorldBounds = true;
    this.spriteZombie.events.onOutOfBounds.add(this.boundOut, this);
//    //

};

Zombie.prototype.update = function (){
	//this.classGame
	if(!this.alive){
		
		this.spriteZombie.destroy();
	}
};

function killZombie()
{
	
	this.spriteZombie.body.velocity.x  = 0;
    this.spriteZombie.body.velocity.y  = 0;
	if(this.spriteZombie.health <= 0)
	{
		this.sound = game.add.audio('audioZombieDead');
		this.sound.play();
		this.spriteZombie.inputEnabled=false;
		this.alive = false;
		this.spriteZombie.loadTexture('zombieDead');
		this.spriteZombie.animations.add('zDead');
		
	    this.spriteZombie.play('zDead',7,false,true);
	    this.classGame.amountZombiesDead += 1;
	    this.classGame.punctuate(1);
	    
	}
	else
	{
		this.sound = game.add.audio('audioPuchZombie');
		this.sound.play();
		this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 1, this.setPuch, this);;
	}
	
//    var index = 0;
//    for(var i = 0 ; i < this.classGame.grouZombies.length; i++)
//    {
//    	if(this.spriteZombie.name ==  this.classGame.grouZombies[i].name)
//    	{
//    		index = this.classGame.grouZombies.indexOf(this.classGame.grouZombies[i]);
//    		
//    	}
//    }
};

Zombie.prototype.boundOut = function(zombie)
{
	
	var velocityX = zombie.body.velocity.x;
    var velocityY = zombie.body.velocity.y;
    

    if (zombie.x < 0)
    	zombie.reset(this.game.world.width, this.game.rnd.integerInRange(162, 400));
    if (zombie.x > this.game.world.width)
    	zombie.reset(0, this.game.rnd.integerInRange(162, 400));
    
    zombie.body.velocity.x = velocityX;
    zombie.body.velocity.y = velocityY;
};

Zombie.prototype.createSprite = function(positionX)
{
	if(positionX < 0)
	{
		this.animation = 'zRigth';
		return 'zombieRigth';
	}
	else
	{
		this.animation = 'zLeft';
		return  'zombieLeft';
	}
};

function randX(rand)
{
	switch (rand) {
	case 0:
		return -150;
		break;

	default:
		return 800;
		break;
	}
};


Zombie.prototype.setVelocity = function(zombie)
{	
	//console.log("zombie::boundout =" + zombie.name);
	if(zombie.name.contains("zRigth"))
	{
		zombie.body.velocity.x  = game.rnd.integerInRange(10,50);
	    zombie.body.velocity.y  = Math.random()*10;
	}
	else
	{
		zombie.body.velocity.x  = - game.rnd.integerInRange(10,50);
	    zombie.body.velocity.y  = - Math.random()*10;
	}
	//console.log("zombie::boundout =" + zombie.name);
};

Zombie.prototype.getHealth = function()
{
	
	if(this.classGame.stage > 1)
	{
		return 1;
	}
	else
	{
		return 0;
	}
};

Zombie.prototype.setPuch = function()
{
	this.spriteZombie.health -= 1;
	this.setVelocity(this.spriteZombie);
};

