Asteroid = function(gameClass) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
	this.velocity = 30;
};

Asteroid.prototype.create = function ( posX , posY , size ) {

    var asteroid, mult;

    if (size == "large") {
        asteroid = this.gameClass.groupAsteroids.create(posX, posY, 'large_asteroid');
        mult = 1;
    }
    if (size == "medium") {
        asteroid = this.gameClass.groupAsteroids.create(posX, posY, 'medium_asteroid');
        mult = 2;
    }
    if (size == "small") {
        asteroid = this.gameClass.groupAsteroids.create(posX, posY, 'small_asteroid');
        mult = 4;
    }

    this.move( asteroid , mult );
    asteroid.size = size;
    asteroid.events.onOutOfBounds.add(this.gameClass.outOfBounds, this);

};

Asteroid.prototype.move = function (asteroid,mult) {

    asteroid.body.velocity.x = (Math.random() * this.velocity * mult);
    asteroid.body.velocity.y = (Math.random() * this.velocity * mult);
    asteroid.body.gravity.x = 0;
    asteroid.body.gravity.y = 0;
    asteroid.body.angularVelocity = Math.random() * 50;

}

Asteroid.prototype.die = function ( shoot , asteroid ) {

    shoot.kill();
    
    if (asteroid.size == "large") {
        this.gameClass.asteroid.create( asteroid.position.x , asteroid.position.y , "medium" );
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "medium");
    }
    if (asteroid.size == "medium") {
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "small");
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "small")
    }
    
    asteroid.kill();
    this.gameClass.punctuate();

};