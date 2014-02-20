Asteroid = function(game,groupAsteroids) {
	this.game = game;
    //this.size = size;
	this.groupAsteroids = groupAsteroids;
	this.velocity = 50;
};

Asteroid.prototype.create = function ( posX , posY , type ) {

    var asteroid;

    if (type == "large") {
        asteroid = this.groupAsteroids.create(posX, posY, 'large_asteroid');
        asteroid.body.velocity.x = (Math.random() * this.velocity);
        asteroid.body.velocity.y = (Math.random() * this.velocity);
    }
    if (type == "medium") {
        asteroid = this.groupAsteroids.create(posX, posY, 'medium_asteroid');
        asteroid.body.velocity.x = (Math.random() * this.velocity) * 2;
        asteroid.body.velocity.y = (Math.random() * this.velocity) * 2;
    }
    if (type == "small") {
        asteroid = this.groupAsteroids.create(posX, posY, 'small_asteroid');
        asteroid.body.velocity.x = (Math.random() * this.velocity) * 4;
        asteroid.body.velocity.y = (Math.random() * this.velocity) * 4;
    }

    asteroid.body.gravity.x = 0;
    asteroid.body.gravity.y = 0;
    asteroid.body.angularVelocity = Math.random() * 50;
    asteroid.events.onOutOfBounds.add(this.outOfBounds, this);

};

Asteroid.prototype.outOfBounds = function (object) {

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