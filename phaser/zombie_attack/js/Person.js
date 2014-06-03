var Person = function (index, game,classGame) {
	
    var x = randX(game.rnd.integerInRange(0, 2));
    var y = game.rnd.integerInRange(162, 400);

    this.game = game;
    this.alive = true;
    this.classGame = classGame;
    this.spritePerson = this.game.add.sprite(x, y,'personDown');
    this.spritePerson.z = 0;
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
    this.spritePerson.events.onOutOfBounds.add(boundOut, this);
    
    this.setVelocity(this.spritePerson);
    //this.spritePerson.z = 0;

};

function boundOut(person)
{
	var y = 0;
	var x = 0;
	if(person.name.contains("rigth"))
	{
		y = game.rnd.integerInRange(162,400);
		x = -50;
	}
	else 
	{
		y = game.rnd.integerInRange(162,400);
		x = 650;
	}
	person.body.reset(x,y);
	this.setVelocity(person);
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
		person.body.velocity.x  = game.rnd.integerInRange(10,20);
		person.body.velocity.y  = Math.random()*10;
	}
	else
	{
		person.body.velocity.x  = - game.rnd.integerInRange(10,20);
		person.body.velocity.y  = - Math.random()*10;
	}
};

Person.prototype.killPerson = function(person,zombie)
{
	this.spriteZombie = zombie;
	zombie.y = person.y;
	zombie.x = person.x;
	zombie.kill();
	this.spritePerson = person;
    person.body.velocity.x  = 0;
    person.body.velocity.y  = 0;
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
	this.classGame.initZombies(this.spritePerson);
};
