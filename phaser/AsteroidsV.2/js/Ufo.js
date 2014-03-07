Ufo = function (gameClass) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
    this.fireRate = 500;
    //this.shootUfo = this.game.add.group();    
    this.nextFire = this.game.time.now + this.fireRate;
    Phaser.Sprite.call(this, this.game, 0, 0, 'sprites', 'ufo_96-61.png');
    this.game.add.audio('ufo', 1).play();
    this.reset(0, Math.random() * this.game.world.height);
    this.anchor.setTo(0.5,0.5);
    this.scale.setTo(0.5,0.5);
    this.body.velocity.x = Math.cos(45 * 0.0174) * 150;
    this.name = 'ufo';
    this.gameClass.groupUfo.add(this);
    this.fireRate = 500;
    this.nextFire = this.game.time.now + this.fireRate;
};

Ufo.prototype = Object.create(Phaser.Sprite.prototype);
Ufo.prototype.constructor = Ufo;

Ufo.prototype.update = function () {
    if (this.game.time.now > this.nextFire && this.alive) {
        this.nextFire = this.game.time.now + this.fireRate;
        this.shoot();
    }
};

Ufo.prototype.shoot = function () {
    this.game.add.audio('shoot', 1, true).play();
    var direction = Math.random() * 360;
    var shoot = this.gameClass.shootUfo.create(this.position.x + Math.cos(direction * 0.0174) * 24,
        	    this.position.y + Math.sin(direction * 0.0174) * 24, 'sprites', 'shoot_2-2.png');
    this.game.physics.velocityFromAngle(direction, 500, shoot.body.velocity);
    shoot.events.onOutOfBounds.add(this.destroyShoot, this);
    shoot.name = 'shoot';
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