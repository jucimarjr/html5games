var Asteroid = function(gameClass, posX , posY , size , vel) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
    if (size == "large") {
    	var i = Math.round(1 + Math.random()*2);
    	//this.sprite = this.gameClass.groupAsteroids.create();
    	Phaser.Sprite.call(this, this.game, posX, posY, 'sprites', 'asteroids'+i+'_80-80.png');
    	i+=3;
    	this.redSprite = this.game.add.sprite(posX,posY,'asteroids','asteroids'+i+'_80-80.png');
    	this.body.setCircle(38);
    	this.redSprite.body.setCircle(38);
        this.hp = 80;
        mult = 1;
    }
    if (size == "medium") {
    	var i = Math.round(1 + Math.random()*2);
    	//this.sprite = this.gameClass.groupAsteroids.create(posX, posY, 'sprites', 'asteroids'+i+'_40-40.png');
    	Phaser.Sprite.call(this, this.game, posX, posY, 'sprites', 'asteroids'+i+'_40-40.png');
    	i+=3;
    	this.redSprite = this.game.add.sprite(posX,posY,'asteroids','asteroids'+i+'_40-40.png');
    	this.body.setCircle(18);
    	this.redSprite.body.setCircle(18);
    	this.hp = 40;
    	mult = 2;
    }
    if (size == "small") {
    	var i = Math.round(1 + Math.random()*2);
    	//this.sprite = this.gameClass.groupAsteroids.create(posX, posY, 'sprites', 'asteroids'+i+'_20-20.png');
    	Phaser.Sprite.call(this, this.game, posX, posY, 'sprites', 'asteroids'+i+'_20-20.png');
    	i+=3;
    	this.redSprite = this.game.add.sprite(posX,posY,'asteroids','asteroids'+i+'_20-20.png');
    	this.body.setCircle(9);
    	this.redSprite.body.setCircle(9);
    	this.hp = 20;
    	mult = 4;
    }
    this.redSprite.alpha = 0;
    this.move(this , this.redSprite, mult*vel);
    this.size = size;
    this.anchor.setTo(0.5,0.5);
    this.redSprite.anchor.setTo(0.5,0.5);
    this.name = 'asteroid';
	this.velocity = 30;
};
Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.move = function (asteroid,asteroidred,mult) {
	var direction = Math.random()*360;
    asteroid.body.velocity.x = Math.cos((direction)*0.0174) * 10 * mult;
    asteroid.body.velocity.y = Math.sin((direction)*0.0174) * 10 * mult;
    asteroid.body.gravity.x = 0;
    asteroid.body.gravity.y = 0;
    asteroid.body.angularVelocity = Math.random() * 50;
    asteroidred.body.velocity.x = asteroid.body.velocity.x;
    asteroidred.body.velocity.y = asteroid.body.velocity.y;
    asteroidred.body.gravity.x = 0;
    asteroidred.body.gravity.y = 0;
    asteroidred.body.angularVelocity = asteroid.body.angularVelocity;
};
