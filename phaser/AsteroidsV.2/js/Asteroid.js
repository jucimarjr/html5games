var Asteroid = function(gameClass) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
	this.velocity = 30;
	this.sprite = null;
	this.size;
};

Asteroid.prototype.create = function ( posX , posY , size , vel) {
    var mult;
    //this.sprite = this.gameClass.groupAsteroids.getFirstDead();
    if (size == "large") {
    	var i = Math.round(1 + Math.random()*2);
    	this.sprite = this.gameClass.groupAsteroids.create(posX, posY, 'sprites', 'asteroids'+i+'_80-80.png');
    	this.sprite.hp = 80;
        mult = 1;
    }
    if (size == "medium") {
    	var i = Math.round(1 + Math.random()*2);
    	this.sprite = this.gameClass.groupAsteroids.create(posX, posY, 'sprites', 'asteroids'+i+'_40-40.png');
    	this.sprite.hp = 40;
    	console.log('size: '+this.sprite.bounds);
    	mult = 2;
    }
    if (size == "small") {
    	var i = Math.round(1 + Math.random()*2);
    	this.sprite = this.gameClass.groupAsteroids.create(posX, posY, 'sprites', 'asteroids'+i+'_20-20.png');
    	this.sprite.hp = 20;
    	mult = 4;
    }
    this.sprite.body.bounce.setTo(1,1);
    this.move( this.sprite , mult*vel);
    this.sprite.size = size;
    this.sprite.anchor.setTo(0.5,0.5);
    this.sprite.name = 'asteroid';
};

Asteroid.prototype.move = function (asteroid,mult) {
	var direction = Math.random()*360;
    asteroid.body.velocity.x = Math.cos((direction)*0.0174) * 10 * mult;
    asteroid.body.velocity.y = Math.sin((direction)*0.0174) * 10 * mult;
    asteroid.body.gravity.x = 0;
    asteroid.body.gravity.y = 0;
    asteroid.body.angularVelocity = Math.random() * 50;

};
