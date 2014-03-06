SpaceShip = function(gameClass) {
	this.game = gameClass.game;
    this.gameClass = gameClass;
    this.sprite = null;
    this.bullet = null;
    this.bulletsGroup = null;
    this.shootInterval = 10;
    this.nextFire = 0;
    this.fireRate = 200;
    this.teleportTime = 3000;
    this.nextTeleport = 0;
    this.lives = 3;
    this.create();
};

SpaceShip.prototype.create = function(){
	this.sprite = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2, 'sprites', 'ship_14-24.png');
    //this.sprite.events.onOutOfBounds.add(this.gameClass.outOfBounds,this);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
    this.sprite.body.gravity.x = 0;
    this.sprite.body.gravity.y = 0;
    this.sprite.body.maxVelocity.x = 1000;
    this.sprite.body.maxVelocity.y = 500;
    this.sprite.body.maxAngularVelocity = 20;
    this.shootInterval = 10;
    this.bulletsGroup = this.game.add.group();
	this.bullet = this.bulletsGroup.create(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
			this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24, 'sprites', 'shoot_2-2.png');
	this.bullet.kill(); 
    this.sprite.animations.add('thrust', ['shipFire1_14-24.png', 'shipFire3_14-24.png'], 15, true, false);
    this.sprite.animations.add('stop', ['ship_14-24.png']);
    this.game.camera.follow(this.sprite);
};

SpaceShip.prototype.update = function () {	
    this.game.physics.collide(this.gameClass.groupAsteroids, this.bulletsGroup, this.gameClass.asteroid.die, null, this);
    this.game.physics.collide(this.sprite, this.gameClass.groupAsteroids, this.die , null, this);       	
    this.game.physics.collide(this.gameClass.groupResources, this.sprite, this.gameClass.colectResources, null, this);
    this.gameClass.warp(this.sprite);
};

SpaceShip.prototype.animate = function(){
	if(!this.sprite.animations.getAnimation('thrust').isPlaying){
		this.sprite.animations.play('thrust');
	}
};

SpaceShip.prototype.rotate = function (direction) {

    if ( direction == "left")
        this.sprite.body.rotation -= 5;
    if ( direction == "right")
        this.sprite.body.rotation += 5;

};

SpaceShip.prototype.accelerate = function () {

    game.add.audio('thrust', 1).play();
    
    this.sprite.body.acceleration.x = Math.cos((this.sprite.body.rotation + 270)*0.0174) *150;
	this.sprite.body.acceleration.y = Math.sin((this.sprite.body.rotation + 270)*0.0174) *150;

};

SpaceShip.prototype.stop = function () {
    this.sprite.body.acceleration.setTo(0, 0);
    this.sprite.animations.stop('thrust');
    this.sprite.animations.play('stop');
};

SpaceShip.prototype.teletransport = function () {
    if (game.time.now > this.nextTeleport)
    {
    	this.nextTeleport = game.time.now + this.teleportTime;
    	this.sprite.x = Math.random() * game.width;
    	this.sprite.y = Math.random() * game.height;
    }
};
 	
SpaceShip.prototype.shoot = function () {    
    
    if (game.time.now > this.nextFire && this.sprite.alive)
    {
        this.nextFire = game.time.now + this.fireRate;
        this.game.add.audio('shoot', 1).play();
        this.bullet = this.bulletsGroup.create(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        			this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24, 'sprites', 'shoot_2-2.png');
        this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, 500, this.bullet.body.velocity);
        this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
        this.shootInterval = 10;
    }

};

SpaceShip.prototype.destroyShoot = function (shoot) {
	shoot.kill();
};

SpaceShip.prototype.die = function (spaceShip, asteroid) {
	var emitter = this.game.add.emitter(this.sprite.x, this.sprite.y, 5);
    emitter.makeParticles('sprites', ['particle_1-15.png']);
    emitter.minParticleSpeed.setTo(-40, -40);
    emitter.maxParticleSpeed.setTo(40, 40);
    emitter.gravity = 0;
    emitter.start(true, 3000, null, 5);
    
    this.gameClass.livesHud.getFirstAlive().kill();
    if(this.gameClass.livesHud.countDead() == 3){
    	this.gameClass.gameOver();	
    }

    setTimeout(function (gameClass) {
        gameClass.spaceShip.sprite.reset(gameClass.game.world.width / 2, gameClass.game.world.height / 2);
    }, 3000, this.gameClass);

    //spaceShip.reset(game.world.width/2, game.world.height/2);
    if (asteroid.size == "large") {
    	
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "medium", this.gameClass.velAsteroids);
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "medium", this.gameClass.velAsteroids);
    }
    if (asteroid.size == "medium") {
    	
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "small", this.gameClass.velAsteroids);
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "small", this.gameClass.velAsteroids);
    }
    asteroid.kill();
    spaceShip.kill();
   
};