
Level = function(game) {

	this.game = game;
	this.asteroids = null;
};

Level.prototype = {
	preload: function() {
		game.load.image('asteroid_pequeno', 'assets/images/asteroid_pequeno.png', 20 , 20);
	    game.load.image('asteroid_medio', 'assets/images/asteroid_medio.png', 35 , 35);
	    game.load.image('asteroid_grande', 'assets/images/asteroid_grande.png', 45 , 45);
	},

	create: function() {  

	    this.asteroids = this.game.add.group();

	    for (var i = 0; i < 10; i++)
	    {	        
	        if (i < 4){
	        	var asteroid = new Asteroids();
	        	asteroid.preload();
	        	asteroid.create();
	        	this.asteroids.add(asteroid);
	        }
	        else{
	        	if (i > 4 && i < 8){
	        		var asteroid = game.add.sprite(Math.random() * game.width, Math.random() * game.height, 'asteroid_medio');
	            	this.asteroids.add(asteroid);
	            }	            	
	            else{
	            	var asteroid = game.add.sprite(Math.random() * game.width, Math.random() * game.height, 'asteroid_pequeno');
	            	this.asteroids.add(asteroid);
	            }
	        }
	    }        
	},

	criarAsteroid: function (tipo,posX,posY) {

	    var asteroid;

	    if (tipo == "grande") {
	        asteroid = this.asteroids_grandes.create(posX, posY, 'asteroid_grande');
	        asteroid.anchor.x = 0.5;
			asteroid.anchor.y = 0.5;
	        asteroid.body.velocity.x = (Math.random() * this.velocity);
	        asteroid.body.velocity.y = (Math.random() * this.velocity);
	    }
	    if (tipo == "medio") {
	        asteroid = this.asteroids_medios.create(posX, posY, 'asteroid_medio');
	        asteroid.anchor.x = 0.5;
			asteroid.anchor.y = 0.5;
	        asteroid.body.velocity.x = (Math.random() * this.velocity) * 2;
	        asteroid.body.velocity.y = (Math.random() * this.velocity) * 2;
	    }
	    if (tipo == "pequeno") {
	        asteroid = this.asteroids_pequenos.create(posX, posY, 'asteroid_pequeno');
	        asteroid.anchor.x = 0.5;
			asteroid.anchor.y = 0.5;
	        asteroid.body.velocity.x = (Math.random() * this.velocity) * 4;
	        asteroid.body.velocity.y = (Math.random() * this.velocity) * 4;
	    }

	    asteroid.body.gravity.x = 0;
	    asteroid.body.gravity.y = 0;
	    asteroid.body.angularVelocity = Math.random() * 50;
	    asteroid.events.onOutOfBounds.add(this.outOfBounds, this);

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

	},

	update: function() {
		this.game.physics.collide(this.asteroids);
	}

};