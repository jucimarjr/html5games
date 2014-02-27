
var Game = function(game){
    this.game = game;
    this.scores = 0;
    this.spaceShip = null;
    this.asteroid = null;
	this.groupAsteroids = null;
	this.tiled1 = null;
	this.tiled2 = null;
	this.livesHud = null;
	this.loseMSG = null;
	this.ufo = null;
	this.score = 0;
	this.scoreText = null;
	this.nextAddUfo = 0;
	this.addUfoTime = 10000;
	this.velAsteroids = null;
	this.numAsteroids = 5;
	this.addAsteroids = 15000;
	this.timeAsteroids = 15000;
};

Game.prototype.create = function () {
	
	this.game.world.setBounds(0, 0, 1000, 1000);
	this.tiled1 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'tiled1');
	this.tiled2 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'tiled2');
	//this.tiled2.fixedToCamera = true;
	//this.tiled2.cameraOffset.setTo(3,3);	
	this.ufo = new Ufo(this);
    this.asteroid = new Asteroid(this);
    this.spaceShip = new SpaceShip(this);
    this.game.camera.follow(this.spaceShip.sprite);
    //this.game.camera.deadzone = new Phaser.Rectangle(this.game.camera.width - 100, this.game.camera.height - 100, 200, 400);
    this.groupAsteroids = this.game.add.group();
    this.initAsteroids(20);
    this.velAsteroids = 1;
    this.score = 0;
    this.scoreText = this.game.add.text(game.width - 150, 20 , this.score, {
        font: "25px Vector Battle", fill: "#ffffff" , align: "right"
    });
    //this.scoreText.fixedToCamera = true;
	this.livesHud = this.game.add.group();
	for(var i = 0; i<3; i++){
		this.livesHud.create(18 * i + 3, 4, 'sprites', 'ship_14-24.png');
	}
	this.nextAddUfo = this.game.time.now + this.addUfoTime;
};

Game.prototype.update = function () {

    this.spaceShip.update();
    this.ufo.update();
    this.scoreText.x = this.game.camera.x + 700;
    this.scoreText.y = this.game.camera.y + 10;
    this.livesHud.x = this.game.camera.x + 10;
    this.livesHud.y = this.game.camera.y + 10;
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
        this.ufo.appear();
    }
    
    if (this.game.time.now > this.timeAsteroids) {
        this.timeAsteroids = this.game.time.now + this.addAsteroids;
        this.initAsteroids(this.numAsteroids);
        this.numAsteroids++;
    }
    /*
    if(this.groupAsteroids.countLiving() == 0){
    	this.velAsteroids++;
    	this.initAsteroids();
    }
    */
                
};

Game.prototype.initAsteroids = function(num){
	for (var i = 0 ; i < num; i++) {
    	var px = Math.random() * this.game.world.width;
    	var py = Math.random() * this.game.world.height;
    	if(px > this.spaceShip.sprite.x - 100){
    		if(px < this.spaceShip.sprite.x + 100){
    			console.log('px:'+px+' '+'py: '+py);
    			px += 150;
    		}
    	}
    	if(py > this.spaceShip.sprite.y - 100){
    		if(py < this.spaceShip.sprite.y + 100){
    			console.log('px:'+px+' '+'py: '+py);
    			py += 150;
    		}
    	}    		
    	this.asteroid.create(px, py, 'large', this.velAsteroids);
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