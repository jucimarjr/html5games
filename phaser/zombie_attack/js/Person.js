var Person = function (index, game,classGame) {
	
    var x = randX(game.rnd.integerInRange(0, 2));
    var y = game.rnd.integerInRange(162, 400);

    this.game = game;
    this.alive = true;
    this.classGame = classGame;
    this.spritePerson = this.game.add.sprite(x, y,'personDown');
    
    this.spritePerson.animations.add('personWalkDown');
    this.spritePerson.animations.play('personWalkDown', 10, true);
    
    this.spriteZombie = null;


    this.spritePerson.name = "person "+this.getPosition(x)+" - "+index.toString();
    this.game.physics.enable(this.spritePerson, Phaser.Physics.ARCADE);
    
    this.spritePerson.body.enable = true;
    
    this.spritePerson.customSeparateX = true;
    this.spritePerson.customSeparateY = true;
    
    this.spritePerson.body.setSize(personWidth,20,0,personHeigth-10);

    this.spritePerson.checkWorldBounds = true;
    this.spritePerson.events.onOutOfBounds.add(this.boundOut, this);
    this.block = false;
//    
    this.setVelocity(this.spritePerson);
    //this.spritePerson.z = 0;

};

Person.prototype.boundOut = function(person)
{
	
	var velocityX = person.body.velocity.x;
    var velocityY = person.body.velocity.y;
    
    
    if (person.x < 0)
    	person.reset(this.game.world.width, game.rnd.integerInRange(162, 400));
    if (person.x > game.world.width)
    	person.reset(0, game.rnd.integerInRange(162, 400));
   
    person.body.velocity.x = velocityX;
    person.body.velocity.y = velocityY;
	
//	console.log("person::boundout =" + person.name);
//	var y = 0;
//	var x = 0;
//	if(person.name.contains("rigth"))
//	{
//		
//		y = game.rnd.integerInRange(162,400);
//		x = -25;
//	}
//	else 
//	{
//		y = game.rnd.integerInRange(162,400);
//		x = 625;
//	}
//	console.log("x = "+x+" y = "+y);
//	person.body.reset(x,y);
//	this.setVelocity(person);
//	console.log("person::boundout =" + person.name);
};

Person.prototype.getPosition = function(positionX)
{
	if(positionX < 0)
	{
		return 'rigth';
	}
	else
	{
		return  'left';
	}
};

function randX(rand)
{
	switch (rand) {
	case 0:
		return 650;
		break;

	default:
		return -50;
		break;
	}
};


Person.prototype.setVelocity = function(person)
{	
	if(person.name.contains("rigth"))
	{
		person.body.velocity.x  = game.rnd.integerInRange(10,30);
		person.body.velocity.y  = Math.random()*10;
	}
	else
	{
		person.body.velocity.x  = - game.rnd.integerInRange(10,30);
		person.body.velocity.y  = - Math.random()*10;
	}
};

Person.prototype.killPerson = function(person,zombie)
{
	zombie.block = false;
	this.spriteZombie = zombie.spriteZombie;
	this.spriteZombie.y = person.y;
	this.spriteZombie.x = person.x;
	this.spriteZombie.kill();
	this.spritePerson = person;
    person.body.velocity.x  = 0;
    person.body.velocity.y  = 0;
    this.classGame.amountPeople -= 1;
	this.alive = false;
	person.loadTexture('zombieBitePerson');
	person.animations.add('zBitePerson');
    person.play('zBitePerson',4,false,true);
    person.destroy;
    this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 1, this.initReviveZombie, this);
};

Person.prototype.initReviveZombie = function()
{
	this.spriteZombie.revive();
	//this.setVelocity(this.spriteZombie);
	this.classGame.initZombies(this.spritePerson);
};

Person.prototype.randPosition(y)
{
};
