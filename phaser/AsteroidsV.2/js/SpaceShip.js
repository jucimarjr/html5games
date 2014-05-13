SpaceShip = function(gameClass, x, y) {
	this.game = gameClass.game;
    this.gameClass = gameClass;
    this.sprite = null;
    this.bullet = null;
    this.bulletsGroup = null;
    this.nextFire = 0;
    this.teleportTime = 3000;
    this.nextTeleport = 0;
    this.lives = 3;
    this.changeShootKey = null;
	this.shootInterval = 10;
    this.shootType = 0;
    this.sound = null;
    this.double = 1;
    this.create(x,y);
    
};

SpaceShip.prototype.create = function(x,y){
	this.velang = 5;
	this.aceler = 5;
	this.velmax = 5;
	this.resist = 5;
	this.shootInt = 5;
	this.bulletvel = 5;
	this.fireRate = 50*(8-this.shootInt);
	this.sound = this.game.add.audio('laserSound', 1);
	var frame1 =  'ship1-blue1-13-21.png';
	var frame2 =  'ship1-blue2-13-21.png';
	switch(ship){
	case 1:
		frame1 =  'ship1-'+color+'1-13-21.png';
		frame2 =  'ship1-'+color+'2-13-21.png';break;
	case 2:
		frame1 =  'ship8-'+color+'1-32-22.png';
		frame2 =  'ship8-'+color+'2-32-22.png';break;
	case 3:
		frame1 =  'ship2-'+color+'1-18-22.png';
		frame2 =  'ship2-'+color+'2-18-22.png';break;
	case 4:
		frame1 =  'ship3-'+color+'1-17-27.png';
		frame2 =  'ship3-'+color+'2-17-27.png';break;
	case 5:
		frame1 =  'ship4-'+color+'1-23-27.png';
		frame2 =  'ship4-'+color+'2-23-27.png';break;
	case 6:
		frame1 =  'ship5-'+color+'1-17-22.png';
		frame2 =  'ship5-'+color+'2-17-22.png';break;
	case 7:
		frame1 =  'ship6-'+color+'1-22-24.png';
		frame2 =  'ship6-'+color+'2-22-24.png';break;
	case 8:
		frame1 =  'ship7-'+color+'1-18-22.png';
		frame2 =  'ship7-'+color+'2-18-22.png';break;
	}
	this.sprite = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2, 'sprites', frame1);
	this.sprite.name = 'ship';
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
    this.sprite.body.gravity.x = 0;
    this.sprite.body.gravity.y = 0;
    this.sprite.body.maxVelocity.x = this.velmax*200;
    this.sprite.body.maxVelocity.y = this.velmax*200;
    this.sprite.smoothed = false;
    this.bulletsGroup = this.game.add.group();
    this.bulletsGroup.createMultiple(50, 'sprites', 'shoot-blue-5-5.png');
    this.bulletsGroup.setAll('anchor.x', 0.5);
    this.bulletsGroup.setAll('anchor.y', 0.5);
    this.bulletsGroup.setAll('outOfBoundsKill', true);
    
    this.sprite.animations.add('thrust', [frame1, frame2], 15, true, false);
    this.sprite.animations.add('stop', [frame1]);
    this.game.camera.follow(this.sprite);
};

SpaceShip.prototype.update = function () {
    this.gameClass.warp(this.sprite);
};

SpaceShip.prototype.rotate = function (direction) {

    if ( direction == "left")
        this.sprite.body.rotation -= 2.5;
    if ( direction == "right")
        this.sprite.body.rotation += 2.5;

};

SpaceShip.prototype.accelerate = function () {
	
    game.add.audio('thrust', 1).play();
    if(!this.sprite.animations.getAnimation('thrust').isPlaying){
		this.sprite.animations.play('thrust');
	}
    this.sprite.body.acceleration.x = Math.cos((this.sprite.body.rotation + 270)*0.0174) *150;
	this.sprite.body.acceleration.y = Math.sin((this.sprite.body.rotation + 270)*0.0174) *150;

};

SpaceShip.prototype.stop = function () {
    this.sprite.body.acceleration.setTo(0, 0);
    this.sprite.animations.stop('thrust');
    this.sprite.animations.play('stop');
};
 	
SpaceShip.prototype.shoot = function () {    
	if(this.sprite.alive){
    if(shoot == 1){
    	if (game.time.now > this.nextFire && this.sprite.alive)
    	{
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.nextFire = game.time.now + this.fireRate;
    			this.game.add.audio('shoot', 1).play();
    		
    			this.bullet = this.bulletsGroup.getFirstDead();
    			this.bullet.loadTexture('sprites', 'shoot-blue-5-5.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, (8+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.name = 'shoot';

    			this.bullet.angle = this.sprite.angle + 90;
    			//this.bullet.scale.setTo(1.5,1.5);
    		}
    	}
    }else if(shoot == 2){
        if (game.time.now > this.nextFire && this.sprite.alive)
        {
        	this.bullet = this.bulletsGroup.getFirstDead();
        	if(this.bullet != null){
        		this.nextFire = game.time.now + this.fireRate;
        		this.game.add.audio('shoot', 1).play();
        		
        		this.bullet = this.bulletsGroup.getFirstDead();
        		this.bullet.loadTexture('sprites', 'shoot-blue-5-5.png');
        		if(this.double == 1){
        			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *16,
         					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *32);
        			this.double = 0;
        		}else{
        			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *32,
         					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *16);
        			this.double = 1;
        		}        		
        		this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, (8+this.bulletvel)*50, this.bullet.body.velocity);
        		this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
        		this.bullet.name = 'shoot';
        			this.bullet.angle = this.sprite.angle + 90;
       			//this.bullet.scale.setTo(1.5,1.5);
        	}
     	}
    }else if(shoot == 3){
        if (game.time.now > this.nextFire && this.sprite.alive)
        {
    		this.game.add.audio('shoot', 1).play();
    		
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.bullet.loadTexture('sprites', 'shoot-blue-5-5.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.body.rotation - 60, (8+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.name = 'shoot';
    		}
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.bullet.loadTexture('sprites', 'shoot-blue-5-5.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, (8+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.name = 'shoot';
    		}
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.bullet.loadTexture('sprites', 'shoot-blue-5-5.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.body.rotation - 120, (8+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.name = 'shoot';
    		}
    		this.nextFire = game.time.now + this.fireRate;
     	}
    }else if(shoot == 4 && !game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
    	this.bullet = this.bulletsGroup.getFirstDead();
    	if(this.bullet != null){
    		this.bullet.loadTexture('sprites', 'shoot-green-18-3.png');
    		if(!this.sound.isPlaying){
    			this.sound.play();
    		}
    		this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *15,
    					      this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *15);
    		this.game.physics.velocityFromAngle(this.sprite.angle - 90, 800, this.bullet.body.velocity);
    		this.bullet.body.velocity.x += this.sprite.body.velocity.x;
    		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
    		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    		this.bullet.angle = this.sprite.angle;
    		this.bullet.scale.setTo(1,1);
    		this.bullet.name = 'laser';
    	}
    }else if(shoot == 5 && !game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
    		if(!this.sound.isPlaying){
    			this.sound.play();
    		}
    		
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.bullet.loadTexture('sprites', 'shoot-green-18-3.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *15,
    					      this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *15);
    			this.game.physics.velocityFromAngle(this.sprite.angle - 45, 800, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
    			this.bullet.body.velocity.y += this.sprite.body.velocity.y;
    			this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.scale.setTo(1,1);
    			this.bullet.angle = this.sprite.angle + 45;
    			this.bullet.name = 'laser';
    		}
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.bullet.loadTexture('sprites', 'shoot-green-18-3.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *15,
				      this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *15);
    			this.game.physics.velocityFromAngle(this.sprite.angle - 135, 800, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
    			this.bullet.body.velocity.y += this.sprite.body.velocity.y;
    			this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.scale.setTo(1,1);
    			this.bullet.angle = this.sprite.angle + 135;
    			this.bullet.name = 'laser';
    		}
    	
    }else if(shoot == 6 && !game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		if(!this.sound.isPlaying){
			this.sound.play();
		}
		
		this.bullet = this.bulletsGroup.getFirstDead();
		if(this.bullet != null){
			this.bullet.loadTexture('sprites', 'shoot-green-18-3.png');
			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *15,
					      this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *15);
			this.game.physics.velocityFromAngle(this.sprite.angle - 90, 800, this.bullet.body.velocity);
			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
			this.bullet.body.velocity.y += this.sprite.body.velocity.y;
			this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
			this.bullet.scale.setTo(1,1);
			this.bullet.angle = this.sprite.angle;
			this.bullet.name = 'laser';
		}
		this.bullet = this.bulletsGroup.getFirstDead();
		if(this.bullet != null){
			this.bullet.loadTexture('sprites', 'shoot-green-18-3.png');
			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *15,
			      this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *15);
			this.game.physics.velocityFromAngle(this.sprite.angle - 180, 800, this.bullet.body.velocity);
			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
			this.bullet.body.velocity.y += this.sprite.body.velocity.y;
			this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
			this.bullet.scale.setTo(1,1);
			this.bullet.angle = this.sprite.angle + 90;
			this.bullet.name = 'laser';
		}
		this.bullet = this.bulletsGroup.getFirstDead();
		if(this.bullet != null){
			this.bullet.loadTexture('sprites', 'shoot-green-18-3.png');
			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *15,
			      this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *15);
			this.game.physics.velocityFromAngle(this.sprite.angle, 800, this.bullet.body.velocity);
			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
			this.bullet.body.velocity.y += this.sprite.body.velocity.y;
			this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
			this.bullet.scale.setTo(1,1);
			this.bullet.angle = this.sprite.angle - 90;
			this.bullet.name = 'laser';
		}
	
}else if(shoot == 7 && !game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
    	this.bullet = this.bulletsGroup.getFirstDead();
    	if(this.bullet != null){
    		this.bullet.loadTexture('sprites', 'shoot-purple-18-3.png');
    		if(!this.sound.isPlaying){
    			this.sound.play();
    		}
    		this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *15,
    					      this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *15);
    		this.game.physics.velocityFromAngle(this.sprite.angle - 90, 1200, this.bullet.body.velocity);
    		this.bullet.body.velocity.x += this.sprite.body.velocity.x;
    		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
    		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    		this.bullet.scale.setTo(2,1);
    		this.bullet.angle = this.sprite.angle + 90;
    		this.bullet.name = 'laser';
    	}
    }else if(shoot == 12){
    	if (game.time.now > this.nextFire && this.sprite.alive)
    	{
    		if(this.bullet != null){
    			this.nextFire = game.time.now + this.fireRate*2;
    			this.game.add.audio('shoot', 1).play();
    		
    			this.bullet = this.bulletsGroup.getFirstDead();
    			this.bullet.loadTexture('sprites', 'shoot-red-18-3.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.angle - 90, (5+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.name = 'shoot';
    			this.bullet.scale.setTo(1,1);
    			this.bullet.anchor.setTo(0,1);
    			this.bullet.angle = this.sprite.angle + 70;
    			
    			var bullet2 = this.bulletsGroup.getFirstDead();
    			bullet2.loadTexture('sprites', 'shoot-red-18-3.png');
    			bullet2.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.angle - 90, (5+this.bulletvel)*50, bullet2.body.velocity);
    			bullet2.body.velocity.x += this.sprite.body.velocity.x;
    			bullet2.body.velocity.y += this.sprite.body.velocity.y;
        		bullet2.events.onOutOfBounds.add(this.destroyShoot, this);
    			bullet2.name = 'shoot';
    			bullet2.scale.setTo(1,1);
    			bullet2.anchor.setTo(0,1);
    			bullet2.angle = this.sprite.angle + 110;
    		}
    	}
    }else if(shoot == 8){
    	if (game.time.now > this.nextFire && this.sprite.alive)
    	{
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.nextFire = game.time.now + this.fireRate*2;
    			this.game.add.audio('shoot', 1).play();
    		
    			this.bullet = this.bulletsGroup.getFirstDead();
    			this.bullet.loadTexture('sprites', 'shoot-orange-18-3.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.angle - 90, (1+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.name = 'shoot';
    			this.bullet.anchor.setTo(0.5,0.5);
    			this.bullet.scale.setTo(1,1);
    			this.bullet.body.angularVelocity = 400;
    			this.bullet.angle = this.sprite.angle + 90;
    			
    			var bullet2 = this.bulletsGroup.getFirstDead();
    			bullet2.loadTexture('sprites', 'shoot-orange-18-3.png');
    			bullet2.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.angle - 90, (1+this.bulletvel)*50, bullet2.body.velocity);
    			bullet2.body.velocity.x += this.sprite.body.velocity.x;
    			bullet2.body.velocity.y += this.sprite.body.velocity.y;
        		bullet2.events.onOutOfBounds.add(this.destroyShoot, this);
    			bullet2.name = 'shoot';
    			bullet2.anchor.setTo(0.5,0.5);
    			bullet2.scale.setTo(1,1);
    			bullet2.angle = this.sprite.angle;
    			bullet2.body.angularVelocity = 400;
    			//this.bullet.scale.setTo(1.5,1.5);
    		}
    	}
    }else if(shoot == 9){
    	if (game.time.now > this.nextFire && this.sprite.alive)
    	{
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.nextFire = game.time.now + this.fireRate;
    			this.game.add.audio('shoot', 1).play();
    		
    			this.bullet = this.bulletsGroup.getFirstDead();
    			this.bullet.loadTexture('sprites', 'shoot-yellow-18-3.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, (8+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.name = 'shoot';

    			this.bullet.angle = this.sprite.angle + 90;
    			//this.bullet.scale.setTo(1.5,1.5);
    		}
    	}
    }else if(shoot == 10){
        if (game.time.now > this.nextFire && this.sprite.alive)
        {
        	this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.nextFire = game.time.now + this.fireRate;
    			this.game.add.audio('shoot', 1).play();
    		
    			this.bullet = this.bulletsGroup.getFirstDead();
    			this.bullet.loadTexture('sprites', 'shoot-yellow-18-3.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *16,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *32);
    			this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, (8+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.name = 'shoot';

    			this.bullet.angle = this.sprite.angle + 90;
    			//this.bullet.scale.setTo(1.5,1.5);
    		}
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.nextFire = game.time.now + this.fireRate;
    			this.game.add.audio('shoot', 1).play();
    		
    			this.bullet = this.bulletsGroup.getFirstDead();
    			this.bullet.loadTexture('sprites', 'shoot-yellow-18-3.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *32,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *16);
    			this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, (8+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.name = 'shoot';

    			this.bullet.angle = this.sprite.angle + 90;
    			//this.bullet.scale.setTo(1.5,1.5);
    		}
     	}
    }else if(shoot == 11){
        if (game.time.now > this.nextFire && this.sprite.alive)
        {
    		this.game.add.audio('shoot', 1).play();
    		
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.bullet.loadTexture('sprites', 'shoot-yellow-18-3.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.body.rotation - 60, (8+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.angle = this.sprite.angle + 120;
    			this.bullet.name = 'shoot';
    		}
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.bullet.loadTexture('sprites', 'shoot-yellow-18-3.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, (8+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.angle = this.sprite.angle + 90;
    			this.bullet.name = 'shoot';
    		}
    		this.bullet = this.bulletsGroup.getFirstDead();
    		if(this.bullet != null){
    			this.bullet.loadTexture('sprites', 'shoot-yellow-18-3.png');
    			this.bullet.reset(this.sprite.position.x + Math.cos((this.sprite.body.rotation + 270)*0.0174) *24,
        					  this.sprite.position.y + Math.sin((this.sprite.body.rotation + 270)*0.0174) *24);
    			this.game.physics.velocityFromAngle(this.sprite.body.rotation - 120, (8+this.bulletvel)*50, this.bullet.body.velocity);
    			this.bullet.body.velocity.x += this.sprite.body.velocity.x;
        		this.bullet.body.velocity.y += this.sprite.body.velocity.y;
        		this.bullet.events.onOutOfBounds.add(this.destroyShoot, this);
    			this.bullet.angle = this.sprite.angle + 60;
    			this.bullet.name = 'shoot';
    		}
    		this.nextFire = game.time.now + this.fireRate;
     	}
    }
	}
};

SpaceShip.prototype.destroyShoot = function (shoot) {
	shoot.kill();
};