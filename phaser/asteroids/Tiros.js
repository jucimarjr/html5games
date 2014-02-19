
Tiros = function(game) {

	this.game = game;
	this.tiros = null;
	
};

Tiros.prototype = {

	preload: function() {
	    
	},

	create: function() {  

	    this.tiros = this.game.add.group();   
        
	},

	tiroColideGrande: function (tiro, asteroid) {
	    tiro.kill();
	    asteroid.kill();

	    level.criarAsteroid("medio",asteroid.position.x,asteroid.position.y);
	    level.criarAsteroid("medio",asteroid.position.x,asteroid.position.y);

	    //  Add and update the score
	    hud.score += 10;
	    hud.scoreText.content = 'Score: ' + hud.score;
	},

	tiroColideMedio: function (tiro, asteroid) {
	    tiro.kill();
	    asteroid.kill();

	    level.criarAsteroid("pequeno",asteroid.position.x,asteroid.position.y);
	    level.criarAsteroid("pequeno",asteroid.position.x,asteroid.position.y);

	    //  Add and update the score
	    hud.score += 20;
	    hud.scoreText.content = 'Score: ' + hud.score;
	},

	tiroColidePequeno: function (tiro, asteroid) {
	    tiro.kill();	    
	    asteroid.kill();

	    //  Add and update the score
	    hud.score += 40;
	    hud.scoreText.content = 'Score: ' + hud.score;
	},

	update: function() {
	    this.game.physics.collide(this.tiros, level.asteroids_grandes, this.tiroColideGrande, null, this);
	    this.game.physics.collide(this.tiros, level.asteroids_medios, this.tiroColideMedio, null, this);
	    this.game.physics.collide(this.tiros, level.asteroids_pequenos, this.tiroColidePequeno, null, this);
	}

};