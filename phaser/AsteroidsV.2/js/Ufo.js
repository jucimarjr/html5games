Ufo = function (gameClass) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
    this.fireRate = 750;
    //this.shootUfo = this.game.add.group();    
    this.nextFire = this.game.time.now + this.fireRate;
    Phaser.Sprite.call(this, this.game, 0, 0, 'sprites', 'ufo1-60-59.png');
    this.game.add.audio('ufo', 1).play();
    this.reset(0, Math.random() * this.game.world.height);
    this.anchor.setTo(0.5,0.5);
    this.body.velocity.x = Math.cos(45 * 0.0174) * 150;
    this.name = 'ufo';
    this.gameClass.groupUfo.add(this);
    this.hp = 50;
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
        	    this.position.y + Math.sin(direction * 0.0174) * 24, 'sprites', 'shoot-green-5-5.png');
    this.game.physics.velocityFromAngle(direction, 500, shoot.body.velocity);
    shoot.events.onOutOfBounds.add(this.destroyShoot, this);
    shoot.name = 'shoot';
    shoot.scale.setTo(1.5,1.5);
};

Ufo.prototype.destroyShoot = function (shoot) {
    shoot.kill();
};