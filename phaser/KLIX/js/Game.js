var Game = function(game){
    this.game = game;
    this.scores = 0;
    this.spaceShip = null;
	this.groupAsteroids = null;
	this.groupResources = null;
	this.resourcesText = null;
	this.tiled1 = null;
	this.tiled2 = null;
	this.livesHud = null;
	this.ufo = null;
	this.groupUfo = null;
	this.shootUfo = null;
	this.score = 0;
	this.scoreText = null;
	this.nextAddUfo = 0;
	this.addUfoTime = 20000;
	this.velAsteroids = null;
	this.numAsteroids = 5;
	this.addAsteroids = 15000;
	this.timeAsteroids = 15000;
	this.mapBox = null;
	this.spawnText = null;
	this.time = 180;
	this.nexttick = 1000;
	this.ticktime = 1000;
	this.tickcount = 0;
	this.timer = 0;
};

Game.prototype.create = function () {
	if(this.game.device.touch){
		console.log('touch enabled');
		this.btns = this.game.add.group(0, 0); 
		this.right = this.game.add.sprite(100,520,'sprites','btn-right.png');
		this.thrust = this.game.add.sprite(625,520,'sprites','btn-thrust.png');
		this.shoot = this.game.add.sprite(715,520,'sprites','btn-shoot.png');
		this.left = this.game.add.sprite(10,520,'sprites','btn-left.png');
		this.right.input.start(0,false);
		this.left.input.start(0,false);
		this.thrust.input.start(0,false);
		this.shoot.input.start(0,false);
		this.btns.add(this.right);
		this.btns.add(this.left);
		this.btns.add(this.thrust);
		this.btns.add(this.shoot);
	}
	this.shootUfo = this.game.add.group();
	this.game.world.setBounds(0, 0, 3200, 1920);
	//this.game.world.setBounds(0, 0, 800, 480);
	this.tiled1 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'tiled1');
	this.tiled2 = this.game.add.tileSprite(-this.game.world.width*5, -this.game.world.height*5, this.game.world.width * 10, this.game.world.height * 10, 'tiled2');
    this.velAsteroids = 5;
    this.score = 0;
    this.scoreText = this.game.add.text(this.game.width/2, 20 , this.score, {
        font: "25px Vector Battle", fill: "#ffffff" , align: "right"
    });
    this.livesHud = this.game.add.group();
	for(var i = 0; i<3; i++){
		this.livesHud.create(18 * i + 3, 4, 'sprites', 'ship1-blue1-13-21.png');
	}
	this.nextAddUfo = this.game.time.now + this.addUfoTime;	
	this.mapBox = this.game.add.graphics();
	this.groupUfo = this.game.add.group();
	this.groupAsteroids = this.game.add.group();
    this.spaceShip = new SpaceShip(this,this.game.world.width/2, this.game.world.height/2);
	this.game.camera.follow(this.spaceShip.sprite);
    this.initAsteroids(20);
    //this.addCircleAsteroids();
    //this.addTunelAsteroids();
	this.groupResources = this.game.add.group();
	this.addResources(10);
	this.fps = this.game.add.text(10, 470, 'FPS: '+this.game.time.fps, {
        font: "12px 'Vector Battle'", fill: "#ffffff" , align: "right"
    });
	this.Hud = this.game.add.text(50, 50, 'TIME: '+this.time/10, {
        font: "24px 'Vector Battle'", fill: "#ffffff" , align: "right"
    });		
	this.alert = this.game.add.sprite(0,0,'alert');
	//console.log(this.alert)
	this.alert.alpha = 0;
	this.alert.fixedToCamera = true;
	this.time = 180;
	this.tick1 = this.game.add.audio('tick1');
	this.tick2 = this.game.add.audio('tick2');	
	this.siren = this.game.add.audio('siren', 0.5);
	this.bang1 =  this.game.add.audio('bang1');
	this.bang2 =  this.game.add.audio('bang2');
};

Game.prototype.updateCounter = function(){
	if(this.spaceShip.sprite.alive){
		this.time--;
		//console.log(this.time);
		if(this.time <= 0){
			this.gameOver();
			this.time = 0;
		}
		this.Hud.content = 'TIME: '+this.time
	}
};

Game.prototype.collectResources = function(spaceship, resource){
	this.time += 15;
	resource.kill();
	this.punctuate(50);
};

Game.prototype.drawMap = function(){
	var dvx = this.game.world.width/this.game.canvas.width;
	var dvy = this.game.world.height/this.game.canvas.height;
	var pxship = Math.round(this.spaceShip.sprite.x/16);
	var pyship = Math.round(this.spaceShip.sprite.y/13);
	var ptx = (this.game.camera.width - 260) + pxship;
	var pty = pyship + 0;
	this.mapBox.clear();
	this.mapBox.beginFill(0x000000);
	this.mapBox.lineStyle(1, 0xffffff);
	var w = this.game.camera.width;
	var h = this.game.camera.height;
	this.mapBox.moveTo(w - (w/4+60),0);
	this.mapBox.lineTo(w - 60,0);
	this.mapBox.lineTo(w - 60,h/4+0);
	this.mapBox.lineTo(w - (w/4+60),h/4+0);
	this.mapBox.lineTo(w - (w/4+60),0);
	this.drawPoint(ptx, pty, 0x00ff00);
	/*
	this.groupAsteroids.forEachAlive(function(asteroid){
		var pxship = Math.round(asteroid.x/16);
		var pyship = Math.round(asteroid.y/13);
		var ptx = (this.game.camera.width - 260) + pxship;
		var pty = pyship + 0;
		this.drawPoint(ptx, pty, 0xffffff);
	}, this);*/
	this.groupResources.forEachAlive(function(resource){
		var pxship = Math.round(resource.x/16);
		var pyship = Math.round(resource.y/13);
		var ptx = (this.game.camera.width - 260) + pxship;
		var pty = pyship + 0;
		this.drawPoint(ptx, pty, 0xff00ff);
	}, this);
	
	this.groupUfo.forEachAlive(function(ufo){
		var pxship = Math.round(ufo.x/16);
		var pyship = Math.round(ufo.y/13);
		var ptx = (this.game.camera.width - 260) + pxship;
		var pty = pyship + 0;
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
	this.fps.content = 'FPS: '+this.game.time.fps;
	this.fps.x = this.game.camera.x + 10;
	this.fps.y = this.game.camera.y + 400;
	this.alert.x = this.game.camera.x;
	this.alert.y = this.game.camera.y;
    this.spaceShip.update();
    this.groupAsteroids.forEachAlive(this.warp,this);
    //this.groupAsteroids.forEachAlive(this.rotateBody,this);
    this.groupUfo.callAll('update', null);
    this.scoreText.x = this.game.camera.x + 400;
    this.scoreText.y = this.game.camera.y + 10;
    this.Hud.x = this.game.camera.x + 10;
    this.Hud.y = this.game.camera.y + 50;    
    this.livesHud.x = this.game.camera.x + 10;
    this.livesHud.y = this.game.camera.y + 10;
    this.tiled2.x -= this.spaceShip.sprite.body.velocity.x/500;
    this.tiled2.y -= this.spaceShip.sprite.body.velocity.y/500;
    if(this.game.device.touch){
    	if(this.thrust.input.pointerDown(0) || this.thrust.input.pointerDown(1)){
            this.spaceShip.accelerate();
            this.spaceShip.animate();
        }else{
        	this.spaceShip.stop();
        }
        if (this.right.input.pointerDown(0) || this.thrust.input.pointerDown(1)){
            this.spaceShip.rotate("right");
        }else if (this.left.input.pointerDown(0) || this.thrust.input.pointerDown(1)){        	
            this.spaceShip.rotate("left");
        }else if (this.shoot.input.pointerDown(0) || this.thrust.input.pointerDown(1)){
            this.spaceShip.shoot();   
        }
    }
    
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        this.spaceShip.rotate("left");
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        this.spaceShip.rotate("right");
    
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.spaceShip.accelerate();
        this.spaceShip.animate();
    } else{
        this.spaceShip.stop();
    }      	    
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.spaceShip.shoot();   
    }
    
    if (this.game.time.now > this.nextAddUfo) {
        this.nextAddUfo = this.game.time.now + this.addUfoTime;
        this.addUfo();
    }
    
    if (this.game.time.now > this.timeAsteroids) {
        this.timeAsteroids = this.game.time.now + this.addAsteroids;
        this.initAsteroids(1);
        this.addResources(1);
        this.numAsteroids++;
    }
    if(this.time < 30 && this.time > 0){
    	if(!this.siren.isPlaying){
			this.siren.play('',0,1);
		}
    }
    if(this.game.time.now > this.nexttick){
    	this.tickcount++;
    	this.nexttick = this.game.time.now + this.ticktime;
    	if(this.tickcount%2)
    		this.tick1.play();
    	else
    		this.tick2.play();
    	
    	this.updateCounter();
    	if(this.time < 30){
			this.alert.alpha = (30 - this.time)/50;
    	}
    }
    this.drawMap();
    this.collide();
};

Game.prototype.collide = function(){
	 this.game.physics.overlap(this.groupAsteroids, this.spaceShip.bulletsGroup, this.collideObj, null, this);
	 this.game.physics.overlap(this.groupAsteroids, this.spaceShip.sprite, this.collideObj, null, this);
	 this.game.physics.overlap(this.groupResources, this.spaceShip.sprite, this.collectResources, null, this);
	 if(this.groupUfo.countLiving() > 0){
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
		damage = 10;
		if(obj1.name == 'shoot'){
			obj1.kill();
			var emitter = this.game.add.emitter(obj1.x, obj1.y, 15);
		    emitter.makeParticles('sprites', ['particle-asteroid-2-2.png']);
		    emitter.minParticleSpeed.setTo(-40, -40);
		    emitter.maxParticleSpeed.setTo(40, 40);
		    emitter.gravity = 0;
		    emitter.start(true, 500, null, 15);
		}else{
			obj2.kill();
			var emitter = this.game.add.emitter(obj2.x, obj2.y, 15);
		    emitter.makeParticles('sprites', ['particle-asteroid-2-2.png']);
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
		    emitter.makeParticles('sprites', ['particle-asteroid-2-2.png']);
		    emitter.minParticleSpeed.setTo(-40, -40);
		    emitter.maxParticleSpeed.setTo(40, 40);
		    emitter.gravity = 0;
		    emitter.start(true, 500, null, 3);
		}else{
			obj2.kill();
			var emitter = this.game.add.emitter(obj2.x, obj2.y, 3);
		    emitter.makeParticles('sprites', ['particle-asteroid-2-2.png']);
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
		if (asteroid.size == "large") {
			var hp = 80;
		}
		else if (asteroid.size == "medium") {
			var hp = 40;
		}
		else if (asteroid.size == "small") {
			var hp = 20;
		}
		asteroid.hp -= damage;
		asteroid.redSprite.alpha = 1.25 - asteroid.hp/hp;
	    if(obj.name == 'shoot'){
	    	asteroid.body.velocity.x += obj.body.velocity.x/75;
	    	asteroid.body.velocity.y += obj.body.velocity.y/75;
	    	asteroid.redSprite.body.velocity.x += obj.body.velocity.x/75;
	    	asteroid.redSprite.body.velocity.y += obj.body.velocity.y/75;
	    }else if(obj.name == 'laser'){
	    	asteroid.body.velocity.x += obj.body.velocity.x/750;
	    	asteroid.body.velocity.y += obj.body.velocity.y/750;
	    	asteroid.redSprite.body.velocity.x += obj.body.velocity.x/750;
	    	asteroid.redSprite.body.velocity.y += obj.body.velocity.y/750;
	    }
	    if(asteroid.hp<=0){
	    	if (asteroid.size == "large") {
	    		if(obj1.name == 'shoot'|| obj2.name == 'shoot'){
	    			this.punctuate(10);
	    			this.bang1.play();
	    		}
	    		var ast1 = new Asteroid(this, asteroid.x, asteroid.y, 'medium', this.velAsteroids);
	        	this.groupAsteroids.add(ast1);
	        	var ast2 = new Asteroid(this, asteroid.x, asteroid.y, 'medium', this.velAsteroids);
	        	this.groupAsteroids.add(ast2);
	    	}
	    	if (asteroid.size == "medium") {
	    		if(obj1.name == 'shoot'|| obj2.name == 'shoot'){
	    			this.punctuate(20);
	    			this.bang1.play();
	    		}
	    		var ast1 = new Asteroid(this, asteroid.x, asteroid.y, 'small', this.velAsteroids);
	        	this.groupAsteroids.add(ast1);
	        	var ast2 = new Asteroid(this, asteroid.x, asteroid.y, 'small', this.velAsteroids);
	        	this.groupAsteroids.add(ast2);
	    	}
	    	if (asteroid.size == "small") {
	    		if(obj1.name == 'shoot'|| obj2.name == 'shoot'){
	    			this.punctuate(40);
	    			this.bang1.play();
	    		}
	    	}
	    	asteroid.kill();
	    	asteroid.redSprite.kill();
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
	    	emitter.makeParticles('sprites', ['shoot-green-18-3.png']);
	    	emitter.minParticleSpeed.setTo(-40, -40);
	    	emitter.maxParticleSpeed.setTo(40, 40);
	    	emitter.gravity = 0;
	    	emitter.start(true, 3000, null, 5);
	    	ufo.kill();	    
	    	if(obj1.name == 'shoot'|| obj2.name == 'shoot'){
	    			this.punctuate(100);
	    	}	    	
	    }
	}
	if(obj2.name == 'ship'||obj1.name == 'ship'){
		if(obj1.name == 'ship'){
			var ship = obj1;
		}else{
			var ship = obj2;
		}
		this.bang2.play();
		var emitter = this.game.add.emitter(ship.x, ship.y, 5);
	    emitter.makeParticles('sprites', ['shoot-blue-18-3.png']);
	    emitter.minParticleSpeed.setTo(-40, -40);
	    emitter.maxParticleSpeed.setTo(40, 40);
	    emitter.gravity = 0;
	    emitter.start(true, 2000, null, 5);
	    ship.alpha = 0;
	    ship.body.velocity.x = 0;
	    ship.body.velocity.y = 0;
	    ship.exists = false;
	    ship.alive = false;
	    //this.timer.timer.pause();
	    //setTimeout(this.wait, 3200, ship);
	    game.time.events.add(2200, this.wait, this);
	    
	    var key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
	    key1.onDown.add(this.resetShip, this);
	    
	}
};

Game.prototype.wait = function(ship){
	this.livesHud.getFirstAlive().kill();
    if(this.livesHud.countLiving() <= 0){
    	this.gameOver();	
    }
    
    
    this.spaceShip.sprite.x = this.game.world.width/2;
    this.spaceShip.sprite.y = this.game.world.height/2; 
	if(this.livesHud.countLiving() >= 1){
		this.spawnText = this.game.add.text(this.spaceShip.sprite.x - 100, this.spaceShip.sprite.y - 20,'Press R to Respawn Here',  
										   {font: "12px Vector Battle", fill: "#ffffff" , align: "center"});
	}
	var key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    key1.onDown.add(this.resetShip, this);
};

Game.prototype.resetShip = function(){
	if(!this.spaceShip.sprite.alive && this.livesHud.countLiving() >= 1)
	{
		this.spawnText.destroy();
		//this.timer.timer.resume();
		this.spaceShip.sprite.alpha = 1;
		this.spaceShip.sprite.exists = true;
		this.spaceShip.sprite.reset(this.game.world.width/2,this.game.world.height/2);
	}
};

Game.prototype.addUfo = function(){
	var ufo1 = new Ufo(this, 0);
	var ufo2 = new Ufo(this, 90);
	var ufo3 = new Ufo(this, 180);
	var ufo4 = new Ufo(this, 270);
	var ufo5 = new Ufo(this, 0);
	var ufo6 = new Ufo(this, 90);
	var ufo7 = new Ufo(this, 180);
	var ufo8 = new Ufo(this, 270);
	this.groupUfo.add(ufo1);
	this.groupUfo.add(ufo2);
	this.groupUfo.add(ufo3);
	this.groupUfo.add(ufo4);
	this.groupUfo.add(ufo5);
	this.groupUfo.add(ufo6);
	this.groupUfo.add(ufo7);
	this.groupUfo.add(ufo8);
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
    	var asteroid = new Asteroid(this, px, py, 'large', this.velAsteroids);
    	this.groupAsteroids.add(asteroid);
    }
};

Game.prototype.addCircleAsteroids = function(){
	var p = new Phaser.Point(Math.round(180 + Math.random()*(this.game.world.width-360)), Math.round(180 + Math.random()*(this.game.world.height - 360)));
	console.log(p.x+' '+p.y);
	var asteroid1 = this.game.add.sprite(p.x, p.y, 'largeasteroids');
	asteroid1.anchor.setTo(1.15,1.15);
	asteroid1.body.angularVelocity = 5;
	var asteroid2 = this.game.add.sprite(p.x, p.y, 'largeasteroids');
	asteroid2.anchor.setTo(-0.15,1.15);
	asteroid2.body.angularVelocity = 5;
	var asteroid3 = this.game.add.sprite(p.x, p.y, 'largeasteroids');
	asteroid3.anchor.setTo(1.15,-0.15);
	asteroid3.body.angularVelocity = 5;
	var asteroid4 = this.game.add.sprite(p.x, p.y, 'largeasteroids');
	asteroid4.anchor.setTo(-0.15,-0.15);
	asteroid4.body.angularVelocity = 5;
	this.groupAsteroids.add(asteroid1);
	this.groupAsteroids.add(asteroid2);
	this.groupAsteroids.add(asteroid3);
	this.groupAsteroids.add(asteroid4);
};

Game.prototype.addTunelAsteroids = function(){
	var p = new Phaser.Point(Math.round(180 + Math.random()*(this.game.world.width-360)), Math.round(180 + Math.random()*(this.game.world.height - 360)));
	var a = Math.random()* 360;
	console.log(Math.cos(a)+'/'+Math.sin(a));
	var asteroid1 = this.game.add.sprite(p.x, p.y, 'largeasteroids');
	asteroid1.angle = a;
	asteroid1.body.polygon.rotate(asteroid1.rotation);
	var posx = asteroid1.x - Math.sin(asteroid1.rotation) * 120;
	var posy = asteroid1.y + Math.cos(asteroid1.rotation) * 120;
	var asteroid2 = this.game.add.sprite(posx, posy, 'largeasteroids');
	asteroid2.angle = a;
	asteroid2.body.polygon.rotate(asteroid2.rotation);
	this.groupAsteroids.add(asteroid1);
	this.groupAsteroids.add(asteroid2);
};
/*
Game.prototype.render = function(){
	this.groupAsteroids.forEach(function(asteroid){
		game.debug.renderPhysicsBody(asteroid.body);
	});
	this.groupUfo.forEach(function(ufo){
		game.debug.renderPhysicsBody(ufo.body);
	});
	this.groupResources.forEach(function(res){
		game.debug.renderPhysicsBody(res.body);
	});
    this.spaceShip.bulletsGroup.forEach(function(bullet){
		game.debug.renderPhysicsBody(bullet.body);
	});
	game.debug.renderPhysicsBody(this.spaceShip.sprite.body);
};
*/
Game.prototype.addResources = function(num){
	for(var i = 0;i < num;i++){
		var resource = this.game.add.sprite(Math.random() * this.game.world.width, Math.random() * this.game.world.height, 'sprites', 'collect-red-9-9.png');
		resource.anchor.setTo(0.5,0.5);
		resource.body.angularVelocity = 5;
		//resource.scale.setTo(2,2);
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
    if(object.name == 'asteroid'){
    	this.warp(object.redSprite);
    }
};

Game.prototype.punctuate = function (points) {
    this.score += points;
    this.scoreText.setText( this.score );
};

Game.prototype.gameOver = function () {
	this.siren.pause();
	this.siren.stop();
	//this.timer.timer.pause();
    game.score = this.score;
    setTimeout(function () { this.game.world.setBounds(0, 0, 800, 480);game.state.start('lose', Lose);} , 500 );
};