Ufo = function (gameClass) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
    this.sprite = this.game.add.sprite(-100, -100, 'sprites', 'ufo_96-61.png');
    this.fireRate = 500;
    this.nextFire = this.game.time.now + this.fireRate;
    this.shootsUfo = this.game.add.group();
    this.sprite.kill();
};

Ufo.prototype.appear = function () {
    this.game.add.audio('ufo', 1).play();
    this.sprite.reset(0, Math.random() * this.game.height);
    this.sprite.anchor.setTo(0.5,0.5);
    this.sprite.scale.setTo(0.5,0.5);
    this.sprite.events.onOutOfBounds.add(this.die, (this,null));
    this.move();
};

Ufo.prototype.move = function () {
    var direction = (45 - Math.random() * 90);
    this.sprite.body.velocity.x = Math.cos(direction * 0.0174) * 150;
    //this.sprite.body.velocity.y = Math.sin(direction * 0.0174) * 150;
};

Ufo.prototype.update = function () {
    this.game.physics.collide(this.gameClass.spaceShip.sprite, this.sprite, this.gameClass.spaceShip.die, null, this);
    this.game.physics.collide(this.gameClass.spaceShip.sprite, this.shootsUfo, this.gameClass.spaceShip.die, null, this);
    this.game.physics.collide(this.gameClass.groupAsteroids, this.shootsUfo, this.gameClass.asteroid.die, null, this);

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

Ufo.prototype.die = function (ufo, shoot) {
    var emitter = this.game.add.emitter(ufo.x, ufo.y, 15);
    emitter.makeParticles('sprites', ['shoot_2-2.png']);
    emitter.minParticleSpeed.setTo(-40, -40);
    emitter.maxParticleSpeed.setTo(40, 40);
    emitter.gravity = 0;
    emitter.start(true, 500, null, 15);

    ufo.kill();
    if( shoot != null )
        shoot.kill();
};