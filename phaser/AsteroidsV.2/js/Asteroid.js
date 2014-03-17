var Asteroid = function(gameClass, posX , posY , size , vel) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
    if (size == "large") {
    	var i = Math.round(1 + Math.random()*2);
    	Phaser.Sprite.call(this, this.game, posX, posY, 'sprites', 'asteroids'+i+'_80-80.png');
    	i+=3;
    	this.redSprite = this.game.add.sprite(posX,posY,'asteroids','asteroids'+i+'_80-80.png');
    	this.hp = 80;
        mult = 1;
        //this.body.setCircle(40);
        /*
        if(i == 1){
        	this.body.setPolygon(1, -59, 25, -79  , 39, -69  , 59, -79  , 79, -60  , 57, -49  , 79, -30  , 55, 0  , 29, -12  , 20, -1  , 1, -21  , 11, -40);
        }else if(i == 2){
        	this.body.setPolygon(1, -59  , 31, -59  , 20, -79  , 49, -79  , 79, -60  , 79, -51  , 45, -40  , 79, -20  , 60, -1  , 45, -12  , 16, 0  , 1, -31 );
        }else{
        	this.body.setPolygon(58, -80  , 78, -51  , 78, -37  , 49, -1  , 29, 0  , 33, -33  , 16, -1  , 0, -31  , 16, -41  , 1, -49  , 30, -80 );
        }
        */
    }
    if (size == "medium") {
    	var i = Math.round(1 + Math.random()*2);
    	Phaser.Sprite.call(this, this.game, posX, posY, 'sprites', 'asteroids'+i+'_40-40.png');
    	i+=3;
    	this.redSprite = this.game.add.sprite(posX,posY,'asteroids','asteroids'+i+'_40-40.png');
    	this.hp = 40;
    	mult = 2;
    	/*
    	if(i == 1){
        	this.body.setPolygon(15, -6  , 10, 0  , 0, -10  , 6, -20  , 0, -30  , 12, -40  , 20, -34  , 30, -40  , 40, -30  , 29, -25  , 40, -15  , 27, 0);
        }else if(i == 2){
        	this.body.setPolygon(0, -30  , 14, -30  , 10, -40  , 26, -40  , 40, -31  , 40, -25  , 22, -20  , 40, -10  , 29, 0  , 21, -5  , 7, 0  , 0, -14);
        }else{
        	this.body.setPolygon(30, -40  , 39, -27  , 39, -18  , 24, 0  , 15, 0  , 16, -16  , 8, -1  , 1, -16  , 8, -20  , 1, -25  , 15, -40);
        }
        */
    }
    if (size == "small") {
    	var i = Math.round(1 + Math.random()*2);
    	Phaser.Sprite.call(this, this.game, posX, posY, 'sprites', 'asteroids'+i+'_20-20.png');
    	i+=3;
    	this.redSprite = this.game.add.sprite(posX,posY,'asteroids','asteroids'+i+'_20-20.png');
    	this.hp = 20;
    	mult = 4;
    	/*
    	if(i == 1){
        	this.body.setPolygon(8, -2  , 5, 0  , 0, -5  , 3, -10  , 0, -15  , 5, -20  , 10, -17  , 15, -20  , 20, -15  , 15, -12  , 20, -7  , 14, 0 );
        }else if(i == 2){
        	this.body.setPolygon(0, -15  , 7, -15  , 5, -20  , 14, -20  , 19, -15  , 19, -12  , 12, -10  , 19, -5  , 14, 0  , 10, -2  , 4, 0  , 0, -6);
        }else{
        	this.body.setPolygon(15, -20  , 20, -13  , 20, -9  , 12, 0  , 7, 0  , 8, -8  , 4, 0  , 0, -8  , 3, -10  , 0, -12  , 7, -20);
        }
        */
    }
    this.redSprite.alpha = 0;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
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
