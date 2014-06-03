var Game = function(game){
    this.game = game;
    this.stage = 0;
    this.playing = true;
    this.idPerson = 0;
    this.idZombie = 0;
    this.score = 0;
    this.scoreText = null;
    this.roundText = null;
//    this.groupZombies = null;
//    this.groupPeople = null;
    this.groupZombies = [];
    this.groupPeople = [];
};

Game.prototype.preload = function(){
	
	
};

Game.prototype.create = function () {
	console.log("criando game");
	this.soundGame = this.game.add.audio('audioBackGroundGame');
	//this.soundGame.play();
	this.spriteCenario = this.game.add.sprite(0, 0,'cenario');
	this.spriteRound = this.game.add.sprite(100,0,'score');
	this.spriteRound = this.game.add.sprite(500,0,'round');
	
	//grupo de pessoas
    this.amountPeople = 0;
//	this.groupPeople = this.game.add.group();
//	this.groupPeople.enableBody = true;
//	this.groupPeople.name = 'groupPeople';
//	this.groupPeople.physicsBodyType = Phaser.Physics.ARCADE;
	this.game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, this.initPeople, this);
	
	 //grupo de zumbis
//	this.amountZombies  = 0;
//    this.groupZombies = this.game.add.group();
//	this.groupZombies.enableBody = true;
//	this.groupZombies.physicsBodyType = Phaser.Physics.ARCADE;
	this.game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, this.initZombies, this);
	//this.groupZombies.add(this.groupPeople);
	
	this.groupGame = this.game.add.group();
	this.groupPeople.enableBody = true;
	this.groupPeople.physicsBodyType = Phaser.Physics.ARCADE;
//	this.groupGame.add(this.groupZombies);
//	this.groupGame.add(this.groupPeople);
//	
	
	//Fonte
	this.stage = 0;
	this.scoreText = game.add.text(224, 28 , this.score,{ font: "25px arcade_normalregular", fill: "#ffffff", align: "right" });
	this.scoreText.setText(0);
	this.roundText = game.add.text(625,28,this.stage,{ font: "25px arcade_normalregular", fill: "#ffffff", align: "right" });
	this.roundText.setText(0);
};

Game.prototype.update = function () {
	//console.log("quantidade zumbis: ",this.amountZombies);
	
	//Colisão
	//this.game.physics.arcade.collide(this.groupZombies, this.collisionHandler, null, this);
	
	//IA do jogo
	//this.boundWorld(this.groupZombies);
	//this.boundOut(this.groupZombies);
	
//	this.groupZombies.sort('y', Phaser.Group.SORT_ASCENDING);
//	this.groupPeople.sort('y', Phaser.Group.SORT_ASCENDING);
	this.groupGame.sort('y', Phaser.Group.SORT_ASCENDING);
	this.boundWorld(this.groupGame);
	this.VerifyCollision();
	
};


Game.prototype.punctuate = function (points) {
	this.score += points;
    this.scoreText.setText(this.score);
};

Game.prototype.Stage = function () {
	console.log("stage ",this.stage);
    this.roundText.setText(this.stage);
};

Game.prototype.gameOver = function () {

};

Game.prototype.collisionHandler = function(zombie,person){
	if(person.alive)
	{
		console.log("colidiu");
		person.killPerson(person.spritePerson,zombie.spriteZombie);
	}
	
	//zombie.spriteZombie.revive();
};

Game.prototype.initStage = function(){
	
};

Game.prototype.initPeople = function(){
	//console.log("initPeople");
	this.idPerson +=1;
	var person = new Person(this.idPerson,this.game,this);
	this.groupPeople.push(person);
	//this.groupGame.add(person.spritePerson);
	this.groupGame.add(person.spritePerson);
	//this.groupPeople.add(person.spritePerson);
};

Game.prototype.initZombies = function(person){
	//console.log("initZombie");
	this.idZombie += 1;
	var zombie = new Zombie(this.idZombie,this.game, this,person);
	//this.groupZombies.add(zombie.spriteZombie);
	this.groupGame.add(zombie.spriteZombie);
	this.groupZombies.push(zombie);
	//console.log("quantidade de zumbis no grupo",this.groupZombies.length);
};

Game.prototype.boundWorld = function(group)
{
	group.forEach(function(object){
		if(object.y < 400 || object.y > 600)
		{
			object.body.velocity.y *= -1;
		}
		
	});
};

Game.prototype.createZombie = function(person){
	
};

Game.prototype.VerifyCollision  = function()
{
	for(var i = 0; i < this.groupPeople.length; i++)
	{
		for(var j = 0; j < this.groupZombies.length; j++)
		{
			if(this.intersect(this.groupPeople[i].spritePerson, this.groupZombies[j].spriteZombie))
			{
				this.collisionHandler(this.groupZombies[j], this.groupPeople[i]);
			}
		}
	}
};


Game.prototype.intersect = function(object1,object2)
{
        if (object1.body.right <= object2.body.position.x)
        {
            return false;
        }

        if (object1.body.bottom <= object2.body.position.y)
        {
            return false;
        }

        if (object1.body.position.x >= object2.body.right)
        {
            return false;
        }

        if (object1.body.position.y >= object2.body.bottom)
        {
            return false;
        }

        return true;
};
