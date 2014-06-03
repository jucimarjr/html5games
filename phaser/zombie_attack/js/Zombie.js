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
    
    //this.sound = game.add.audio('audioZombieDead');
    this.setVelocity(this.spriteZombie);
    
    this.spriteZombie.checkWorldBounds = true;
    this.spriteZombie.events.onOutOfBounds.add(boundOut, this);
    //

};

Zombie.prototype.update = function (){
	//this.classGame
	if(!this.alive){
		
		this.spriteZombie.destroy();
	}
};

function killZombie()
{
	this.spriteZombie.inputEnabled=false;
	this.spriteZombie.body.velocity.x  = 0;
    this.spriteZombie.body.velocity.y  = 0;
	this.alive = false;
	this.spriteZombie.loadTexture('zombieDead');
	this.spriteZombie.animations.add('zDead');
    this.spriteZombie.play('zDead',7,false,true);
    this.classGame.amountZombies -= 1;
    this.classGame.punctuate(1);
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

function boundOut(zombie)
{
	var y = 0;
	var x = 0;
	if(zombie.name.contains("zRigth"))
	{
		y = game.rnd.integerInRange(162,400);
		x = -150;
	}
	else 
	{
		y = game.rnd.integerInRange(162,400);
		x = 750;
	}
	zombie.body.reset(x,y);
	this.setVelocity(zombie);
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
		return 750;
		break;
	}
};


Zombie.prototype.setVelocity = function(zombie)
{	
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
};

