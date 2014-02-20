
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

    this.spaceShip = new SpaceShip(this.game);
    this.groupAsteroids = this.game.add.group();
    this.asteroid = new Asteroid(this.game,this.groupAsteroids);

    for (var i = 0 ; i < 7; i++) {
        this.asteroid.create( Math.random() * game.width, Math.random() * game.height, 'large' );
    }
    for (var i = 0 ; i < 5; i++) {
        this.asteroid.create( Math.random() * game.width, Math.random() * game.height, 'medium');
    }
    for (var i = 0 ; i < 3; i++) {
        this.asteroid.create( Math.random() * game.width, Math.random() * game.height, 'small');
    }

};

Game.prototype.update = function () {

    this.spaceShip.update();
    this.game.physics.collide( this.spaceShip , this.groupAsteroids );

};

Game.prototype.punctuate = function () {

};

Game.prototype.loseLife = function () {

};