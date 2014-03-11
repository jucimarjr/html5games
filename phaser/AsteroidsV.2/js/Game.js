
var Game = function(game){
    this.game = game;
    this.scores = 0;
    this.spaceShip = null;
    this.asteroid = null;
	this.groupAsteroids = null;
	this.groupResources = null;
	this.resourcesText = null;
	this.tiled1 = null;
	this.tiled2 = null;
	this.livesHud = null;
	this.loseMSG = null;
	this.ufo = null;
	this.groupUfo = null;
	this.shootUfo = null;
	this.score = 0;
	this.scoreText = null;
	this.nextAddUfo = 0;
	this.addUfoTime = 10000;
	this.velAsteroids = null;
	this.numAsteroids = 5;
	this.addAsteroids = 15000;
	this.timeAsteroids = 15000;
	this.mapBox = null;
};

Game.prototype.create = function () {	
	this.shootUfo = this.game.add.group();
	this.game.world.setBounds(0, 0, 2400, 1440);
	this.tiled1 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'tiled1');
	this.tiled2 = this.game.add.tileSprite(-this.game.world.width*5, -this.game.world.height*5, this.game.world.width * 10, this.game.world.height * 10, 'tiled2');
    this.velAsteroids = 5;
    this.score = 0;
    this.scoreText = this.game.add.text(this.game.width/2, 20 , this.score, {
        font: "25px Vector Battle", fill: "#ffffff" , align: "right"
    });
    this.livesHud = this.game.add.group();
	for(var i = 0; i<3; i++){
		this.livesHud.create(18 * i + 3, 4, 'sprites', 'ship_14-24.png');
	}
	this.nextAddUfo = this.game.time.now + this.addUfoTime;	
	this.mapBox = this.game.add.graphics();
	this.mapBox.beginFill(0x000000);
	this.mapBox.lineStyle(1, 0xffffff);
	this.mapBox.moveTo(this.game.camera.width - 245,5);
	this.mapBox.lineTo(this.game.camera.width - 5,5);
	this.mapBox.lineTo(this.game.camera.width - 5,149);
	this.mapBox.lineTo(this.game.camera.width - 245,149);
	this.mapBox.lineTo(this.game.camera.width - 245,5);
	this.groupUfo = this.game.add.group();
	this.groupAsteroids = this.game.add.group();
	//this.groupAsteroids.createMultiple(200, 'sprites', 'asteroids1_80-80.png');
    this.asteroid = new Asteroid(this);
    this.spaceShip = new SpaceShip(this);
    this.game.camera.follow(this.spaceShip.sprite);	
	//this.initAsteroids(50);
	this.groupResources = this.game.add.group();
	this.addResources();
	this.fps = this.game.add.text(10, 470, 'FPS: '+this.game.time.fps, {
        font: "12px Vector Battle", fill: "#ffffff" , align: "right"
    });
	this.Hud = this.game.add.text(50, 50, 'Resources \nto colect: '+this.groupResources.countLiving()+'\nShoot Type: ', {
        font: "12px Vector Battle", fill: "#ffffff" , align: "left"
    });	
};

Game.prototype.collectResources = function(spaceship, resource){
	resource.kill();
	this.Hud.content = 'Resources \nto colect: '+this.groupResources.countLiving();
};

Game.prototype.drawMap = function(){
	var pxship = Math.round(this.spaceShip.sprite.x/10);
	var pyship = Math.round(this.spaceShip.sprite.y/10);
	var ptx = (this.game.camera.width - 245) + pxship;
	var pty = pyship + 5;
	this.mapBox.clear();
	this.mapBox.beginFill(0x000000);
	this.mapBox.lineStyle(1, 0xffffff);
	this.mapBox.moveTo(this.game.camera.width - 245,5);
	this.mapBox.lineTo(this.game.camera.width - 5,5);
	this.mapBox.lineTo(this.game.camera.width - 5,149);
	this.mapBox.lineTo(this.game.camera.width - 245,149);
	this.mapBox.lineTo(this.game.camera.width - 245,5);
	this.drawPoint(ptx, pty, 0x00ff00);
	this.groupAsteroids.forEachAlive(function(asteroid){
		var pxship = Math.round(asteroid.x/10);
		var pyship = Math.round(asteroid.y/10);
		var ptx = (this.game.camera.width - 245) + pxship;
		var pty = pyship + 5;
		this.drawPoint(ptx, pty, 0xffffff);
	}, this);
	this.groupResources.forEachAlive(function(resource){
		var pxship = Math.round(resource.x/10);
		var pyship = Math.round(resource.y/10);
		var ptx = (this.game.camera.width - 245) + pxship;
		var pty = pyship + 5;
		this.drawPoint(ptx, pty, 0xff00ff);
	}, this);
	
	this.groupUfo.forEachAlive(function(ufo){
		var pxship = Math.round(ufo.x/10);
		var pyship = Math.round(ufo.y/10);
		var ptx = (this.game.camera.width - 245) + pxship;
		var pty = pyship + 5;
		this.drawPoint(ptx, pty, 0xff0000);
	}, this);
};

Game.prototype.drawPoint = function(px, py, color){
	this.mapBox.moveTo(px,py);
	this.mapBox.lineStyle(2, color);
	this.mapBox.lineTo(px + 1,py);
	this.mapBox.lineTo(px + 1,py + 2);
	this.mapBox.lineTo(px,py + 2);
	this.mapBox.lineTo(px,py);
};

Game.prototype.update = function () {
	this.Hud.content = 'Resources \nto colect: '+this.groupResources.countLiving()+'\nShoot Type: '+this.spaceShip.shootType;
	this.fps.content = 'FPS: '+this.game.time.fps;
	this.fps.x = this.game.camera.x + 10;
	this.fps.y = this.game.camera.y + 400;
    this.spaceShip.update();
    this.groupAsteroids.forEachAlive(this.warp,this);
    this.groupUfo.callAll('update', null);
    this.scoreText.x = this.game.camera.x + 400;
    this.scoreText.y = this.game.camera.y + 10;
    this.Hud.x = this.game.camera.x + 10;
    this.Hud.y = this.game.camera.y + 50;    
    this.livesHud.x = this.game.camera.x + 10;
    this.livesHud.y = this.game.camera.y + 10;
    this.tiled2.x -= this.spaceShip.sprite.body.velocity.x/500;
    this.tiled2.y -= this.spaceShip.sprite.body.velocity.y/500;
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        this.spaceShip.rotate("left");
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        this.spaceShip.rotate("right");
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.spaceShip.accelerate();
        this.spaceShip.animate();
    } else{
        this.spaceShip.stop();
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.spaceShip.teletransport();
    }
        	    
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.spaceShip.shoot();   
    }
    
    if (this.game.time.now > this.nextAddUfo) {
        this.nextAddUfo = this.game.time.now + this.addUfoTime;
        this.addUfo();
    }
    
    if (this.game.time.now > this.timeAsteroids) {
        this.timeAsteroids = this.game.time.now + this.addAsteroids;
        //this.initAsteroids(this.velAsteroids);
        var resource = this.game.add.sprite(Math.random() * this.game.world.width, Math.random() * this.game.world.height, 'res');
		//resource.lifespan = 30000;
		resource.body.angularVelocity = 5;
		this.game.add.tween(resource).to( { alpha: 0.5}, 200, Phaser.Easing.Linear.InOut, true, 0, 1000, true);
		this.groupResources.add(resource);
        this.numAsteroids++;
    }
    this.drawMap();
    this.collide();          
};

Game.prototype.collide = function(){
	 this.game.physics.overlap(this.groupAsteroids, this.spaceShip.bulletsGroup, this.collideObj, null, this);
	 //this.game.physics.collide(this.groupAsteroids);
	 this.game.physics.overlap(this.groupAsteroids, this.spaceShip.sprite, this.collideObj, null, this);
	 this.game.physics.overlap(this.groupResources, this.spaceShip.sprite, this.collectResources, null, this);
	 if(this.ufo != null){
		 this.game.physics.overlap(this.groupAsteroids, this.groupUfo, this.collideObj, null, this);
		 this.game.physics.overlap(this.groupAsteroids, this.shootUfo, this.collideObj, null, this);
		 this.game.physics.overlap(this.spaceShip.sprite, this.shootUfo, this.collideObj, null, this);
		 this.game.physics.overlap(this.spaceShip.sprite, this.groupUfo, this.collideObj, null, this);
		 this.game.physics.overlap(this.spaceShip.bulletsGroup, this.groupUfo, this.collideObj, null, this);
	 }
};

Game.prototype.collideObj = function(obj1, obj2){
	var damage = 100;
	if(obj2.name == 'shoot' || obj1.name == 'shoot'){
		var damage = 10;
		if(obj1.name == 'shoot'){
			obj1.kill();
			var emitter = this.game.add.emitter(obj1.x, obj1.y, 15);
		    emitter.makeParticles('sprites', ['shoot_2-2.png']);
		    emitter.minParticleSpeed.setTo(-40, -40);
		    emitter.maxParticleSpeed.setTo(40, 40);
		    emitter.gravity = 0;
		    emitter.start(true, 500, null, 15);
		}else{
			obj2.kill();
			var emitter = this.game.add.emitter(obj2.x, obj2.y, 15);
		    emitter.makeParticles('sprites', ['shoot_2-2.png']);
		    emitter.minParticleSpeed.setTo(-40, -40);
		    emitter.maxParticleSpeed.setTo(40, 40);
		    emitter.gravity = 0;
		    emitter.start(true, 500, null, 15);
		}
	}
	if(obj2.name == 'laser' || obj1.name == 'laser'){
		var damage = 1;
		if(obj1.name == 'laser'){
			obj1.kill();
			var emitter = this.game.add.emitter(obj1.x, obj1.y, 3);
		    emitter.makeParticles('sprites', ['shoot_2-2.png']);
		    emitter.minParticleSpeed.setTo(-40, -40);
		    emitter.maxParticleSpeed.setTo(40, 40);
		    emitter.gravity = 0;
		    emitter.start(true, 500, null, 3);
		}else{
			obj2.kill();
			var emitter = this.game.add.emitter(obj2.x, obj2.y, 3);
		    emitter.makeParticles('sprites', ['shoot_2-2.png']);
		    emitter.minParticleSpeed.setTo(-40, -40);
		    emitter.maxParticleSpeed.setTo(40, 40);
		    emitter.gravity = 0;
		    emitter.start(true, 500, null, 3);
		}
	}
	if(obj1.name == 'asteroid' || obj2.name == 'asteroid'){
		if(obj1.name == 'asteroid'){
			var asteroid = obj1;
			var obj = obj2;
		}else{
			var asteroid = obj2;
			var obj = obj1;
		}
	    asteroid.hp -= damage;
	    if(obj1.name == 'shoot'){
	    	asteroid.body.velocity.x += obj.body.velocity.x/75;
	    	asteroid.body.velocity.y += obj.body.velocity.y/75;
	    }else if(obj.name == 'laser'){
	    	asteroid.body.velocity.x += obj.body.velocity.x/750;
	    	asteroid.body.velocity.y += obj.body.velocity.y/750;
	    }
	    if(asteroid.hp<=0){
	    	if (asteroid.size == "large") {
	    		this.punctuate(10);
	    		this.asteroid.create(asteroid.position.x, asteroid.position.y, "medium", this.velAsteroids);
	    		this.asteroid.create(asteroid.position.x, asteroid.position.y, "medium", this.velAsteroids);
	    	}
	    	if (asteroid.size == "medium") {
	    		this.punctuate(20);
	    		this.asteroid.create(asteroid.position.x, asteroid.position.y, "small", this.velAsteroids);
	    		this.asteroid.create(asteroid.position.x, asteroid.position.y, "small", this.velAsteroids);
	    	}
	    	if (asteroid.size == "small") {
	    		this.punctuate(40);
	    	}
	    	asteroid.kill();
	    }
	    
	}
	if(obj1.name == 'ufo' || obj2.name == 'ufo'){		
		if(obj1.name == 'ufo'){
			var ufo = obj1;
		}else{
			var ufo = obj2;
		}
		ufo.hp -= damage;
	    if(ufo.hp <= 0)
	    {
	    	var emitter = this.game.add.emitter(ufo.x, ufo.y, 7);
	    	emitter.makeParticles('sprites', ['particle_1-15.png']);
	    	emitter.minParticleSpeed.setTo(-40, -40);
	    	emitter.maxParticleSpeed.setTo(40, 40);
	    	emitter.gravity = 0;
	    	emitter.start(true, 3000, null, 5);
	    	ufo.kill();	    	
	    }
	}
	else if(obj2.name == 'ship'||obj1.name == 'ship'){
		if(obj1.name == 'ship'){
			var ship = obj1;
		}else{
			var ship = obj2;
		}
		var emitter = this.game.add.emitter(ship.x, ship.y, 5);
	    emitter.makeParticles('sprites', ['particle_1-15.png']);
	    emitter.minParticleSpeed.setTo(-40, -40);
	    emitter.maxParticleSpeed.setTo(40, 40);
	    emitter.gravity = 0;
	    emitter.start(true, 3000, null, 5);
	    //this.livesHud.getFirstAlive().kill();
	    if(this.livesHud.countLiving() <= 0){
	    	this.gameOver();	
	    }
	    setTimeout(function (gameClass) {
	        gameClass.spaceShip.sprite.reset(gameClass.game.world.width / 2, gameClass.game.world.height / 2);
	    }, 3000, this);
	    ship.kill();
	}
};

Game.prototype.addUfo = function(){
	for(var i = 0;i < 4;i++){
		this.ufo = new Ufo(this);
	}	
};

Game.prototype.initAsteroids = function(num){
	for (var i = 0 ; i < num; i++) {
    	var px = Math.random() * this.game.world.width;
    	var py = Math.random() * this.game.world.height;
    	if(px > this.spaceShip.sprite.x - 100){
    		if(px < this.spaceShip.sprite.x + 100){
    			px += 150;
    		}
    	}
    	if(py > this.spaceShip.sprite.y - 100){
    		if(py < this.spaceShip.sprite.y + 100){
    			py += 150;
    		}
    	}    		
    	this.asteroid.create(px, py, 'large', this.velAsteroids);
    }
};

Game.prototype.addResources = function(){
	for(var i = 0;i < 5;i++){
		var resource = this.game.add.sprite(Math.random() * this.game.world.width, Math.random() * this.game.world.height, 'res');
		//resource.lifespan = 30000;
		resource.body.angularVelocity = 5;
		this.game.add.tween(resource).to( { alpha: 0.5}, 200, Phaser.Easing.Linear.InOut, true, 0, 1000, true);
		this.groupResources.add(resource);
	}
};

Game.prototype.warp = function (object) {
    var velocityX = object.body.velocity.x;
    var velocityY = object.body.velocity.y;
    var angularVelocity = object.body.angularVelocity;

    if (object.x < 0)
        object.reset(this.game.world.width, object.y);
    if (object.x > this.game.world.width)
        object.reset(0, object.y);
    if (object.y < 0)
        object.reset(object.x, this.game.world.height);
    if (object.y > this.game.world.height)
        object.reset(object.x, 0);

    object.body.velocity.x = velocityX;
    object.body.velocity.y = velocityY;
    object.body.angularVelocity = angularVelocity;

};

Game.prototype.punctuate = function (points) {
    this.score += points;
    this.scoreText.setText( this.score );
};

Game.prototype.gameOver = function () {
    game.score = this.score;
    game.add.text(this.game.camera.width/2 - 100, this.game.camera.height/2, "Game Over", {
        font: "40px Vector Battle", fill: "#ffffff", align: "center"
    });
    setTimeout(function () { game.state.start('highScoreInput', HighScoreInput);} , 3000 );
};