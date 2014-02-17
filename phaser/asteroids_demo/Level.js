
Level = function(game) {

	this.game = game;
	this.asteroids_pequenos = null;
	this.asteroids_medios = null;
	this.asteroids_grandes = null;
	this.velocity = 50;

};

Level.prototype = {

	preload: function() {
	    this.game.load.image('asteroid_pequeno', 'assets/asteroid_pequeno.png', 20 , 20);
	    this.game.load.image('asteroid_medio', 'assets/asteroid_medio.png', 35 , 35);
	    this.game.load.image('asteroid_grande', 'assets/asteroid_grande.png', 45 , 45);
	},

	create: function() {  

	    this.asteroids_grandes = game.add.group();
	    this.asteroids_medios = game.add.group();
	    this.asteroids_pequenos = game.add.group();

	    for (var i = 0; i < 10; i++)
	    {
	        var asteroid;
	        if (i < 4)
	            this.criarAsteroid("grande", Math.random() * game.width, Math.random() * game.height);
	        else
	            if (i > 4 && i < 8)
	                this.criarAsteroid("medio", Math.random() * game.width, Math.random() * game.height);
	            else
	                this.criarAsteroid("pequeno", Math.random() * game.width, Math.random() * game.height);

	    }
        
	},

	criarAsteroid: function (tipo,posX,posY) {

	    var asteroid;

	    if (tipo == "grande") {
	        asteroid = this.asteroids_grandes.create(posX, posY, 'asteroid_grande');
	        asteroid.body.velocity.x = (Math.random() * this.velocity);
	        asteroid.body.velocity.y = (Math.random() * this.velocity);
	    }
	    if (tipo == "medio") {
	        asteroid = this.asteroids_medios.create(posX, posY, 'asteroid_medio');
	        asteroid.body.velocity.x = (Math.random() * this.velocity) * 2;
	        asteroid.body.velocity.y = (Math.random() * this.velocity) * 2;
	    }
	    if (tipo == "pequeno") {
	        asteroid = this.asteroids_pequenos.create(posX, posY, 'asteroid_pequeno');
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