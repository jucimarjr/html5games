
var Game = function(game){
    this.game = game;
    this.scores = 0;
    this.spaceShip = null;
    this.asteroid = null;
	this.groupAsteroids = null;
	this.livesHud = null;
	this.loseMSG = null;
	this.ufo = null;
	this.nextAddUfo = 0;
	this.addUfoTime = 10000;
};

Game.prototype.create = function () {
	this.ufo = new Ufo(this);
	this.asteroid = new Asteroid(this);
	this.spaceShip = new SpaceShip(this);
	this.groupAsteroids = this.game.add.group();
	this.livesHud = this.game.add.group();
	for(var i = 0; i<3; i++){
		this.livesHud.create(18 * i + 3, 4, 'sprites', 'ship_14-24.png');
	}
	this.nextAddUfo = this.game.time.now + this.addUfoTime;
	
    for (i = 0 ; i < 5; i++) {
    	var px = Math.random() * game.width;
    	var py = Math.random() * game.height;
    	if((px > this.game.width/2 + 80 && px < this.game.width/2 - 80)
    	&& (py > this.game.height/2 + 80 && py < this.game.height/2 - 80)){
    		px += 100;
    		py += 100;
    	}
    	this.asteroid.create(px, py, 'large');
    }
};

Game.prototype.update = function () {

    this.spaceShip.update();
    this.ufo.update();
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        this.spaceShip.rotate("left");
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        this.spaceShip.rotate("right");
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.spaceShip.accelerate();
        this.spaceShip.animate();
    } else{
        this.spaceShip.stop();
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.spaceShip.teletransport();
    }
        	    
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.spaceShip.shoot();   
    }
    
    if (this.game.time.now > this.nextAddUfo) {
        this.nextAddUfo = this.game.time.now + this.addUfoTime;
        this.ufo.appear();
    }
                
};

Game.prototype.outOfBounds = function (object) {

    var velocityX = object.body.velocity.x;
    var velocityY = object.body.velocity.y;
    var angularVelocity = object.body.angularVelocity;

    if (object.x < 0)
        object.reset(game.world.width, object.y);
    if (object.x > game.world.width)
        object.reset(0, object.y);
    if (object.y < 0)
        object.reset(object.x, game.world.height);
    if (object.y > game.world.height)
        object.reset(object.x, 0);

    object.body.velocity.x = velocityX;
    object.body.velocity.y = velocityY;
    object.body.angularVelocity = angularVelocity;

};

Game.prototype.punctuate = function () {
    
};

Game.prototype.loseLife = function () {
    
};