/**
 * 
 */
Asteroids = function(game, x, y, size) {
	Phaser.Sprite.call(this, game, x, y);
	this.sprite = null;
	this.size = size;
};
Asteroids.prototype = Object.create(Phaser.Sprite.prototype);
Asteroids.prototype.constructor = Asteroids;

/**
 * Automatically called by World.update
 */


Asteroids.prototype = {
	preload: function() {
		game.load.image('asteroid_pequeno', 'images/asteroid_pequeno.png', 20 , 20);
	    game.load.image('asteroid_medio', 'images/asteroid_medio.png', 35 , 35);
	    game.load.image('asteroid_grande', 'images/asteroid_grande.png', 45 , 45);
	},
	create: function(){
		this.sprite = game.add.sprite(Math.random() * game.width, Math.random() * game.height, 'asteroid_' + this.size)
		this.sprite.body.velocity.x = (50 - (Math.random() * 50));
		this.sprite.body.velocity.y = (50 - (Math.random() * 50));
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.body.gravity.x = 0;
		this.sprite.body.gravity.y = 0;
		this.sprite.body.angularVelocity = Math.random() * 50;
		this.sprite.events.onOutOfBounds.add(this.outOfBounds, this);
	},
	update: function(){
		
	},
	outOfBounds: function (object) {

	    var velocityX = object.body.velocity.x;
	    var velocityY = object.body.velocity.y;
	    var angularVelocity = object.body.angularVelocity;

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
	    object.body.angularVelocity = angularVelocity;

	}
}