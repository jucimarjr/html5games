SpaceShip = function(game) {
	this.game = game;
	this.tiros = null;
	this.atirar = false;
	this.atirando = false;	
	this.sprite = game.add.sprite(game.width/2, game.height/2, 'nave');
	this.sprite.events.onOutOfBounds.add(this.outOfBounds,this);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
    this.sprite.body.gravity.x = 0;
    this.sprite.body.gravity.y = 0;
    this.sprite.body.maxVelocity.x = 1000;
    this.sprite.body.maxVelocity.y = 500;
    this.sprite.body.maxAngularVelocity = 20;
    this.tirosGroup = game.add.group();
};
    	
SpaceShip.prototype.atirar = function () {
	    var tiro = tirosGroup.tiros.create(this.sprite.position.x, this.sprite.position.y, 'tiro');
	    this.game.physics.velocityFromAngle(this.sprite.body.rotation, 500, tiro.body.velocity);
	    tiro.events.onOutOfBounds.add(this.destroyTiro, this);
};

SpaceShip.prototype.destroyTiro = function (tiro) {
	    tiro.kill();
};

SpaceShip.prototype.destroyNave = function (nave, asteroid) {
	    nave.reset(game.world.width/2, game.world.height/2);
	    asteroid.kill();	    
	    //level.criarAsteroid("medio",asteroid.position.x,asteroid.position.y);
	    //level.criarAsteroid("medio",asteroid.position.x,asteroid.position.y);
};

SpaceShip.prototype.update = function () {
        
        //this.game.physics.collide(this.sprite, this.game.groupAsteroids);
        //this.game.physics.collide(this.sprite, game.groupAsteroids, this.destroyNave, null, this);

    	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		    this.sprite.body.rotation -= 5;
    	else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
	        this.sprite.body.rotation += 5;

    	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    		thrust = game.add.audio('thrust', 1);
    		thrust.play();
		    if (this.sprite.body.rotation > 30 && this.sprite.body.rotation < 150)
		        this.sprite.body.acceleration.y += 5;
		    else if (this.sprite.body.rotation < -20 && this.sprite.body.rotation > -150)
		        this.sprite.body.acceleration.y -= 5;

		    if (this.sprite.body.rotation < 70 && this.sprite.body.rotation > -70)
		        this.sprite.body.acceleration.x += 5;
		    else if (this.sprite.body.rotation > 110 || this.sprite.body.rotation < -110)
		        this.sprite.body.acceleration.x -= 5;

		} else{
			this.sprite.body.acceleration.setTo(0, 0);       	
		}
    	    
    	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    	    this.atirar = true;    		
    	else
		    this.atirando = false;

		if (this.atirar && !this.atirando) {
			tiroSom = this.game.add.audio('shoot', 1);
    		tiroSom.play();
		    this.atirar = false;
		    this.atirando = true;
		    var tiro = this.tirosGroup.create(this.sprite.position.x, this.sprite.position.y, 'tiro');
	        this.game.physics.velocityFromAngle(this.sprite.body.rotation, 500, tiro.body.velocity);
	        tiro.events.onOutOfBounds.add(this.destroyTiro, this);
	    }
        
};

SpaceShip.prototype.outOfBounds = function (object) {

    var velocityX = object.body.velocity.x;
    var velocityY = object.body.velocity.y;
    var accelerationX = object.body.acceleration.x;
    var accelerationY = object.body.acceleration.y;

    if (object.x < 0)
        object.reset(game.world.width, object.y);
    if (object.x > game.world.width)
        object.reset(0, object.y);
    if (object.y < 0)
        object.reset(object.x, game.world.height);
    if (object.y > game.world.height)
        object.reset(object.x, 0);

    object.body.velocity.x = velocityX;
    object.body.velocity.y = velocityY;
    object.body.acceleration.x = accelerationX;
    object.body.acceleration.y = accelerationY;

};