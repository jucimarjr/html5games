var Game = function(game){
    this.game = game;
    this.stage = 0;
    this.playing = true;
    this.idPerson = 0;
    this.idZombie = 0;
    this.score = 0;
    this.scoreText = null;
    this.roundText = null;
    this.groupZombies = null;
    this.groupPeople = null;
};

Game.prototype.preload = function(){
	
	
};

Game.prototype.create = function () {
	console.log("criando game");
	
	this.spriteMuro = this.game.add.sprite(0, 0,'muro');
	this.spriteRua = this.game.add.sprite(0, 260,'rua');
	
	//grupo de pessoas
    this.amountPeople = 0;
	this.groupPeople = this.game.add.group();
	this.groupPeople.enableBody = true;
	this.groupPeople.physicsBodyType = Phaser.Physics.ARCADE;
	
	 //grupo de zumbis
	this.amountZombies  = 0;
    this.groupZombies = this.game.add.group();
	this.groupZombies.enableBody = true;
	this.groupZombies.physicsBodyType = Phaser.Physics.ARCADE;
	
	//Fonte
	this.stage = 0;
	var style = { font: "25px Arial", fill: "#ffffff", align: "right" };
	this.scoreText = game.add.text(100, 20 , this.score,style);
	this.scoreText.setText( "Score: "+0 );
	this.roundText = game.add.text(500,20,this.stage,style);
	this.roundText.setText( "Round: "+0 );
};

Game.prototype.update = function () {
	console.log("quantidade zumbis: ",this.amountZombies);
	
	//Colisão
	this.game.physics.arcade.collide(this.groupZombies, this.groupPeople, this.collisionHandler, null, this);
	
	//IA do jogo
	if(this.amountZombies == 0){
		console.log("criando pessoas");
		this.amountPeople += 2;
		this.amountZombies += (this.amountPeople * 2);
		this.stage += 1;
		this.Stage();
		round = new Round(this.stage,this.amountZombies,this.amountPeople);
		this.game.time.events.repeat(Phaser.Timer.SECOND * 2, this.amountPeople, this.initPeople, this);
	}
};


Game.prototype.punctuate = function (points) {
	this.score += points;
    this.scoreText.setText( "Score: "+this.score );
};

Game.prototype.Stage = function () {
	console.log("stage ",this.stage);
    this.roundText.setText( "Round: "+this.stage);
};

Game.prototype.gameOver = function () {

};

Game.prototype.collisionHandler = function(zombie,person){
	console.log("colidiu");
	zombie.killPerson(person);
};

Game.prototype.initStage = function(){
	
};

Game.prototype.initPeople = function(amountPeople){
	console.log("initPeople");
		this.idPerson +=1;
			var person = new Person(this.idPerson,this.game);
			this.groupPeople.add(person.spritePerson);
			//Cada pessoa criada 2 novos zumbis são criados
			this.initZombies(person);
};

Game.prototype.initZombies = function(person){
	console.log("initZombie");
	this.idZombie += 1;
	for(var i = 0; i < 2 ; i++){
		var zombie = new Zombie(this.idZombie,this.game, person, this);
		this.groupPeople.add(zombie.spriteZombie);
	}
};



