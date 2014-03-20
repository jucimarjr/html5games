Ufo = function (gameClass) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
    this.fireRate = 500;
    //this.shootUfo = this.game.add.group();    
    this.nextFire = this.game.time.now + this.fireRate;
    Phaser.Sprite.call(this, this.game, 0, 0, 'sprites', 'ufo_96-61.png');
    this.game.physics.enable(this, Phaser.Physics.P2JS);
    //this.game.add.audio('ufo', 1).play();
    this.reset(0, Math.random() * this.game.world.height);
    this.anchor.setTo(0.5,0.5);
    this.scale.setTo(0.5,0.5);
    this.body.velocity.x = 150;
    this.name = 'ufo';
    this.gameClass.groupUfo.add(this);
    this.hp = 50;
    this.fireRate = 500;
    this.outOfBoundsKill = true;
    this.nextFire = this.game.time.now + this.fireRate;
};

Ufo.prototype = Object.create(Phaser.Sprite.prototype);
Ufo.prototype.constructor = Ufo;

Ufo.prototype.update = function () {
    if (this.game.time.now > this.nextFire && this.alive) {
        this.nextFire = this.game.time.now + this.fireRate;
        this.shoot();
    }
    //this.gameClass.groupAsteroids.forEach(this.verifyDistance, this);
};

Ufo.prototype.verifyDistance = function(asteroid){
	var dist = this.center.distance(asteroid.center);
	var minDist = 0;
	if(asteroid.size == 'large'){
		minDist = 120;
	}else if(asteroid.size == 'medium'){
		minDist = 60;
	}else if(asteroid.size == 'small'){
		minDist = 30;
	}
	if(dist <= minDist){
		var direction = 30 + Math.round(Math.random()* 300);
		this.body.velocity.x = Math.cos(direction * 0.0174)*150;
		this.body.velocity.y = Math.sin(direction * 0.0174)*150;
	}
}

Ufo.prototype.shoot = function () {
    this.game.add.audio('shoot', 1).play();
    var direction = Math.random() * 360;
    var shoot = this.gameClass.shootUfo.create(this.position.x + Math.cos(direction * 0.0174) * 24,
        	    this.position.y + Math.sin(direction * 0.0174) * 24, 'sprites', 'shoot_2-2.png');
    this.game.physics.enable(shoot, Phaser.Physics.ARCADE);
    this.game.physics.arcade.velocityFromAngle(direction, 500, shoot.body.velocity);
    shoot.events.onOutOfBounds.add(this.destroyShoot, this);
    shoot.name = 'shoot';
    shoot.scale.setTo(1.5,1.5);
};

Ufo.prototype.destroyShoot = function (shoot) {
    shoot.kill();
};