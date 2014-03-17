Ship = function(gameClass) {
	this.game = gameClass.game;
    this.gameClass = gameClass;
    this.sprite = null;
    
    this.bullets = null;
    this.bulletTime = 0;
    this.fireRate = 100;

    this.nextFire = 0;

    //this.bulletsGroup = null;
    //this.shootInterval = 10;
    //this.nextFire = 0;
    //this.fireRate = 200;
    //this.teleportTime = 3000;
    //this.nextTeleport = 0;
    //this.lives = 3;
    this.create(this.game);
};


Ship.prototype.create = function(game){
	
	this.sprite = this.game.add.sprite(this.game.width / 2-15, 550,'ship','ShipWhite2_20-30.png');
	this.sprite.anchor.setTo(0.5,0.5);
	this.sprite.enableBody = true;
	
	
	
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	
	this.bullets.createMultiple(50,'bullet');
	this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
	this.bullets.setAll('outOfBoundsKill', true);

	//this.gameClass.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	
	
	
	//this.sprite.fixedToCamera = true;
	
	//fixed = game.add.sprite(480, 600, 'ship');
    //fixed.fixedToCamera = true;

//	this.sprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'sprites', 'ship_14-24.png');
//    this.sprite.events.onOutOfBounds.add(this.gameClass.outOfBounds,this);
//	this.sprite.anchor.x = 0.5;
//	this.sprite.anchor.y = 0.5;
//    this.sprite.body.gravity.x = 0;
//    this.sprite.body.gravity.y = 0;
//    this.sprite.body.maxVelocity.x = 1000;
//    this.sprite.body.maxVelocity.y = 500;
//    this.sprite.body.maxAngularVelocity = 20;
//    this.shootInterval = 10;
//    this.bulletsGroup = this.game.add.group();
//	this.bullet = this.bulletsGroup.create(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
//			this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24, 'sprites', 'shoot_2-2.png');
//	this.bullet.kill(); 
//    this.sprite.animations.add('thrust', ['shipFire1_14-24.png', 'shipFire2_14-24.png'], 15, true, false);
//    this.sprite.animations.add('stop', ['ship_14-24.png']);
};

Ship.prototype.update = function () {	
	
	 

//    this.game.physics.collide(this.gameClass.groupAsteroids, this.bulletsGroup, this.gameClass.asteroid.die, null, this);
//    this.game.physics.collide(this.sprite, this.gameClass.groupAsteroids, this.die , null, this);       	
//    this.game.physics.collide(this.gameClass.ufo.sprite, this.bulletsGroup, this.gameClass.ufo.die, null, this);
};

Ship.prototype.animate = function(){
//	if(!this.sprite.animations.getAnimation('thrust').isPlaying){
//		this.sprite.animations.play('thrust');
//	}
};

Ship.prototype.stop = function(){
	this.sprite.body.velocity.x = 0;
	
}

Ship.prototype.move = function (direction) {

	if( direction == "left" && this.sprite.x > 12){
	    this.sprite.x -= 10;
	}
	        
	else if (direction == "right" && this.sprite.x < this.game.width-12){
	    this.sprite.x += 10;
	 }
	 
};

 	
Ship.prototype.shoot = function () {    
    
//    if (game.time.now > this.nextFire && this.sprite.alive)
//    {
//        this.nextFire = game.time.now + this.fireRate;
//        this.game.add.audio('shoot', 1).play();
//        this.bullet = this.bulletsGroup.create(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
//        			this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24, 'sprites', 'shoot_2-2.png');
//        this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, 500, this.bullet.body.velocity);
//        this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
//        this.shootInterval = 10;
//    }

};

Ship.prototype.destroyShoot = function (shoot) {
	//shoot.kill();
};

Ship.prototype.die = function (spaceShip, asteroid) {

};

Ship.prototype.setSpriteShip = function(sprite){
	this.sprite = sprite;
}

Ship.prototype.getSpriteShip = function(){
	return this.sprite;
}

Ship.prototype.fire = function(){
	if (this.game.time.now > this.bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(this.sprite.x, this.sprite.y);//posicáo de saida do tiro
            bullet.body.velocity.y = -800; //velocidade do projetil
            this.bulletTime = game.time.now + 200;
        }
    }

}