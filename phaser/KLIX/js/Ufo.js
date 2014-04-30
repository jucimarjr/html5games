Ufo = function (gameClass, direction) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
    this.fireRate = 750;
    //this.shootUfo = this.game.add.group();    
    this.nextFire = this.game.time.now + this.fireRate;
    Phaser.Sprite.call(this, this.game, 0, 0, 'sprites', 'ufo1-60-59.png');
    this.game.add.audio('ufo', 1).play();
    this.anchor.setTo(0.5,0.5);
    switch (direction){
    case 0:
    	this.reset(10, 10+(Math.random() * this.game.world.height-10));break;
    case 180:
    	this.reset(this.game.world.width - 10, 10 + (Math.random() * this.game.world.height-10));break;
    case 90:
    	this.reset(10+(Math.random() * this.game.world.width-10), 10);break;
    case 270:
    	this.reset(10+(Math.random() * this.game.world.width-10), this.game.world.height-10);break;
    }
    this.game.physics.velocityFromAngle(direction, 150,this.body.velocity);
    this.body.angularVelocity = 200;
    this.name = 'ufo';
    this.gameClass.groupUfo.add(this);
    this.hp = 50;
    this.nextFire = this.game.time.now + this.fireRate;
    //this.outOfBoundsKill = true;
};

Ufo.prototype = Object.create(Phaser.Sprite.prototype);
Ufo.prototype.constructor = Ufo;

Ufo.prototype.update = function () {
    if (this.game.time.now > this.nextFire && this.alive) {
        this.nextFire = this.game.time.now + this.fireRate;
        this.shoot();
    }
    this.gameClass.warp(this);
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