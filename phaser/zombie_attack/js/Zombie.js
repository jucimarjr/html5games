var Zombie = function (index, game, person, classGame) {
	
    var x = game.world.randomX;
    var y = game.rnd.integerInRange(162,400);
    
    this.animation = 'zDown';
    this.game = game;
    this.spritePerson = person;
    this.alive = true;
    
    this.classGame = classGame;

    this.spriteSheetZombie = createSprite(this.game.rnd.integerInRange(1, 4));
    this.spriteZombie = this.game.add.sprite(x, y,this.spriteSheetZombie);
    
    this.spriteZombie.animations.add(this.animation);
    this.spriteZombie.play(this.animation,7,true);

    this.spriteZombie.name = index.toString();
    this.game.physics.enable(this.spriteZombie, Phaser.Physics.ARCADE);

    this.spriteZombie.body.enable = true;
    
    this.spriteZombie.body.immovable = false;
    this.spriteZombie.body.collideWorldBounds = true;
    this.spriteZombie.body.bounce.setTo(1, 1);
    
    this.spriteZombie.inputEnabled=true;
    this.spriteZombie.body.velocity.x  = 0;
    
    this.spriteZombie.body.setSize(100,10, 0, zombieHeigth-10);
    
    this.spriteZombie.events.onInputDown.add(killZombie,this);
    
    //this.sound = game.add.audio('audioZombieDead');
    
    this.spriteZombie.body.velocity.x  = Math.random()*10;
    this.spriteZombie.body.velocity.y  = Math.random()*10;
};

Zombie.prototype.update = function (){
	//this.classGame
	if(!this.alive&&!this.spriteZombie.animation.isPlaying){
		this.spriteZombie.destroy();
	}
	console.log("posicao y do zumbi = ",this.spriteZombie.body.y);
	
};

Zombie.prototype.preload = function(){
	
};

Zombie.prototype.swapZombie = function(zombie){
	
}

function killZombie(){
	//this.sound.play();
	//this.spriteZombie.destroy();
	this.spriteZombie.inputEnabled=false;
	this.spriteZombie.body.velocity.x  = 0;
    this.spriteZombie.body.velocity.y  = 0;
	this.alive = false;
	this.spriteZombie.loadTexture('zombieDead');
	this.spriteZombie.animations.add('zDead');
	//this.spriteZombie.destroy();
    this.spriteZombie.play('zDead',7,false,true);
    this.classGame.amountZombies -= 1;
    this.classGame.punctuate(1);
    
    //console.log("amount zombie ="+this.classGame.amountZombie);
};

function createSprite(rand){
	switch (rand) {
	case 1:
		this.animation = 'zUp';
		return 'zombieUp';
		break;
	case 2:
		this.animation = 'zLeft';
		return 'zombieLeft';
		break;
	case 3:
		this.animation = 'zRigth';
		return 'zombieRigth';
		break;
	default:
		this.animation = 'zDown';
		return 'zombieDown';
		break;
	}
};

//Debug
/*Zombie.prototype.render = function(){

    this.game.debug.body(this.spriteZombie);
    

};*/
