
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
	this.groupUfo = null;
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
    this.asteroid = new Asteroid(this);
    this.spaceShip = new SpaceShip(this);
    this.game.camera.follow(this.spaceShip.sprite);
	this.groupAsteroids = this.game.add.group();
	this.initAsteroids(20);
	this.groupResources = this.game.add.group();
	this.addResources();
	this.resourcesText = this.game.add.text(50, 50, 'Resources \nto colect: '+this.groupResources.countLiving(), {
        font: "12px Vector Battle", fill: "#ffffff" , align: "right"
    });	
};

Game.prototype.colectResources = function(spaceship, resource){
	resource.kill();
	//this.resourcesText.content = 'Resources \nto colect: '+this.groupResources.countLiving();
};

Game.prototype.drawMap = function(){
	var pxship = Math.round(this.spaceShip.sprite.x/10);
	var pyship = Math.round(this.spaceShip.sprite.y/10);
	var ptx = (this.game.camera.width - 245) + pxship;
	var pty = pyship + 5;
	//console.log('ptx: '+ptx+' '+'pty: '+pty);
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
    this.spaceShip.update();
    this.groupUfo.callAllExists('update', null);
    this.groupAsteroids.forEachAlive(this.warp,this);
    this.scoreText.x = this.game.camera.x + 400;
    this.scoreText.y = this.game.camera.y + 10;
    this.resourcesText.x = this.game.camera.x + 10;
    this.resourcesText.y = this.game.camera.y + 50;    
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
        this.initAsteroids(this.velAsteroids);
        this.numAsteroids++;
    }
    this.drawMap();
    
    /*
    if(this.groupAsteroids.countLiving() == 0){
    	this.velAsteroids++;
    	this.initAsteroids();
    }
    */
                
};

Game.prototype.addUfo = function(){
	var ufo = new Ufo(this);
	ufo.appear(0, Math.random()*this.game.world.height, 45);
	var ufo = new Ufo(this);
	ufo.appear(0, Math.random()*this.game.world.height, 45);
	var ufo = new Ufo(this);
	ufo.appear(0, Math.random()*this.game.world.height, 45);
	var ufo = new Ufo(this);
	ufo.appear(0, Math.random()*this.game.world.height, 45);
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
    game.add.text(this.game.width/2 - 100, this.game.height/2, "Game Over", {
        font: "40px Vector Battle", fill: "#ffffff", align: "center"
    });
    setTimeout(function () { this.game.state.start('HighScoreInput', HighScoreInput) } , 3000 );
};