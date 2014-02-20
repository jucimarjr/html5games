
Game = function(game){
    this.game = game;
    this.scores = 0;
    this.lives = 0;
    this.spaceShip = null;
    this.asteroid = null;
	this.groupAsteroids = null;
	this.ufo = null;
};

Game.prototype.create = function () {
    this.groupAsteroids = this.game.add.group();
    this.asteroid = new Asteroid(this);
    this.spaceShip = new SpaceShip(this);    
    this.init();
};

Game.prototype.init = function () {

    for (var i = 0 ; i < 7; i++) {
        this.asteroid.create(Math.random() * game.width, Math.random() * game.height, 'large');
    }
    for (var i = 0 ; i < 5; i++) {
        this.asteroid.create(Math.random() * game.width, Math.random() * game.height, 'medium');
    }
    for (var i = 0 ; i < 3; i++) {
        this.asteroid.create(Math.random() * game.width, Math.random() * game.height, 'small');
    }

};

Game.prototype.update = function () {

    this.spaceShip.update();
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        this.spaceShip.rotate("left");
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        this.spaceShip.rotate("right");
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.spaceShip.accelerate();
    } else{
        this.spaceShip.stop();
    }
        	    
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        this.spaceShip.shoot();    		
        
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