var Asteroid = function(gameClass) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
	this.velocity = 30;
};

Asteroid.prototype.create = function ( posX , posY , size ) {
    var asteroid, mult;
    if (size == "large") {
    	var i = Math.round(1 + Math.random()*2);
        asteroid = this.gameClass.groupAsteroids.create(posX, posY, 'sprites', 'asteroids'+i+'_80-80.png');
        mult = 1;
    }
    if (size == "medium") {
    	var i = Math.round(1 + Math.random()*2);
        asteroid = this.gameClass.groupAsteroids.create(posX, posY, 'sprites', 'asteroids'+i+'_40-40.png');
    	mult = 2;
    }
    if (size == "small") {
    	var i = Math.round(1 + Math.random()*2);
        asteroid = this.gameClass.groupAsteroids.create(posX, posY, 'sprites', 'asteroids'+i+'_20-20.png');
    	mult = 4;
    }

    this.move( asteroid , mult );
    asteroid.size = size;
    asteroid.anchor.setTo(0.5,0.5);
    asteroid.events.onOutOfBounds.add(this.gameClass.outOfBounds, this);
    
};

Asteroid.prototype.move = function (asteroid,mult) {
	var direction = Math.random()*360;
    asteroid.body.velocity.x = Math.cos((direction)*0.0174) * 10 * mult;
    asteroid.body.velocity.y = Math.sin((direction)*0.0174) * 10 * mult;
    asteroid.body.gravity.x = 0;
    asteroid.body.gravity.y = 0;
    asteroid.body.angularVelocity = Math.random() * 50;

}

Asteroid.prototype.die = function (asteroid, shoot) {
    shoot.kill();
    
    var emitter = this.game.add.emitter(asteroid.x, asteroid.y, 15);
    emitter.makeParticles('sprites', ['shoot_2-2.png']);
    emitter.minParticleSpeed.setTo(-40, -40);
    emitter.maxParticleSpeed.setTo(40, 40);
    emitter.gravity = 0;
    emitter.start(true, 500, null, 15);
    
    if (asteroid.size == "large") {
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "medium");
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "medium");
    }
    if (asteroid.size == "medium") {
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "small");
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "small");
    }
    
    asteroid.kill();
    this.gameClass.punctuate();

};
