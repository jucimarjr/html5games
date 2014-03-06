Ufo = function (gameClass) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
    this.sprite = this.game.add.sprite(-100, -100, 'sprites', 'ufo_96-61.png');
    this.fireRate = 500;
    this.nextFire = this.game.time.now + this.fireRate;
    this.shootsUfo = this.game.add.group();
    this.sprite.kill();
};

Ufo.prototype.appear = function (px, py, dir) {
    this.game.add.audio('ufo', 1).play();
    this.sprite.reset(0, Math.random() * this.game.world.height);
    this.sprite.anchor.setTo(0.5,0.5);
    this.sprite.scale.setTo(0.5,0.5);
    this.sprite.events.onOutOfBounds.add(this.die, (this,null));
    this.sprite.body.velocity.x = Math.cos(dir * 0.0174) * 150;
    this.gameClass.groupUfo.add(this.sprite);
};

Ufo.prototype.update = function () {
    this.game.physics.collide(this.gameClass.spaceShip.sprite, this.sprite, this.gameClass.spaceShip.die, null, this);
    this.game.physics.collide(this.gameClass.spaceShip.sprite, this.shootsUfo, this.gameClass.spaceShip.die, null, this);
    this.game.physics.collide(this.gameClass.groupAsteroids, this.shootsUfo, this.gameClass.asteroid.die, null, this);
    this.game.physics.collide(this.gameClass.groupAsteroids, this.sprite, this.die, null, this);
    if (this.game.time.now > this.nextFire && this.sprite.alive) {
        this.nextFire = this.game.time.now + this.fireRate;
        this.shoot();
    }
};

Ufo.prototype.shoot = function () {
    this.game.add.audio('shoot', 1).play();
    var direction = Math.random() * 360;
    var shoot = this.shootsUfo.create(this.sprite.position.x + Math.cos(direction * 0.0174) * 24,
        	    this.sprite.position.y + Math.sin(direction * 0.0174) * 24, 'sprites', 'shoot_2-2.png');
    this.game.physics.velocityFromAngle(direction, 500, shoot.body.velocity);
    shoot.events.onOutOfBounds.add(this.destroyShoot, this);
};

Ufo.prototype.destroyShoot = function (shoot) {
    shoot.kill();
};

Ufo.prototype.die = function (ufo, asteroid) {
    var emitter = this.game.add.emitter(ufo.x, ufo.y, 15);
    emitter.makeParticles('sprites', ['shoot_2-2.png']);
    emitter.minParticleSpeed.setTo(-40, -40);
    emitter.maxParticleSpeed.setTo(40, 40);
    emitter.gravity = 0;
    emitter.start(true, 500, null, 15);
    
    if(asteroid != null){
        if (asteroid.size == "large") {
            this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "medium", this.gameClass.velAsteroids);
            this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "medium", this.gameClass.velAsteroids);
        }
        if (asteroid.size == "medium") {
            this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "small", this.gameClass.velAsteroids);
            this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "small", this.gameClass.velAsteroids);
        }
        asteroid.kill();
        this.gameClass.punctuate(30);
    }
    ufo.kill();
};