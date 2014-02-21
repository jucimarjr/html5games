SpaceShip = function(gameClass) {

	this.game = gameClass.game;
    this.gameClass = gameClass;

    //this.sprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'sprites', 'ship_22-34.png');
    this.sprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'nave');
	this.sprite.events.onOutOfBounds.add(gameClass.outOfBounds,this);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
    this.sprite.body.gravity.x = 0;
    this.sprite.body.gravity.y = 0;
    this.sprite.body.maxVelocity.x = 1000;
    this.sprite.body.maxVelocity.y = 500;
    this.sprite.body.maxAngularVelocity = 20;
    this.shootsGroup = this.game.add.group();
    this.shootInterval = 10;

};

SpaceShip.prototype.update = function () {
	
    this.game.physics.collide(this.sprite, this.gameClass.groupAsteroids, this.die , null, this);       	
    this.game.physics.collide(this.shootsGroup, this.gameClass.groupAsteroids, this.gameClass.asteroid.die, null, this);
    
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
};

SpaceShip.prototype.teletransport = function () {
	this.sprite.x = Math.random() * game.width;
	this.sprite.y = Math.random() * game.height;
};
 	
SpaceShip.prototype.shoot = function () {

    if (this.shootInterval == 0) {
        this.game.add.audio('shoot', 1).play();
        //var shoot = this.shootsGroup.create(this.sprite.position.x, this.sprite.position.y, 'sprites', 'shoot_2-2.png');
        var shoot = this.shootsGroup.create(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24, this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24, 'tiro');
        this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, 500, shoot.body.velocity);
        shoot.events.onOutOfBounds.add(this.destroyShoot, this);
        this.shootInterval = 10;
    } else
        this.shootInterval--;

};

SpaceShip.prototype.destroyShoot = function (shoot) {
	shoot.kill();
};

SpaceShip.prototype.die = function (spaceShip, asteroid) {
    spaceShip.reset(game.world.width/2, game.world.height/2);
    if (asteroid.size == "large") {
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "medium");
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "medium");
    }
    if (asteroid.size == "medium") {
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "small");
        this.gameClass.asteroid.create(asteroid.position.x, asteroid.position.y, "small");
    }
    asteroid.kill();
    this.gameClass.loseLife();
};