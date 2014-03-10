Qix = function() {
	this.game = null;
	this.sprite = null;
	this.speed = 300;
	
	this.released = false;
};

Qix.prototype = {
	preload : function() {
		//Carrega os sprites do jogo
		game.load.image('qix', 'assets/images/qix.png');
	},

	create : function() {
		//Adiciona o sprite d qix na tela
		this.sprite = game.add.sprite(0, 0,'qix');
		
		var minimum = new coordinates();
		minimum.x = screenGame.thicknessBGame + this.sprite.width;
		minimum.y = screenGame.thicknessExtras + screenGame.thicknessBGame + this.sprite.height;
		
		var maximum = new coordinates();
		maximum.x = game.world.width - screenGame.thicknessBGame - this.sprite.width;
		maximum.y = game.world.height+screenGame.thicknessExtras - screenGame.thicknessBGame - this.sprite.height;
		
		//Re-posiciona aleatoriamente o qix
		this.sprite.reset(Math.floor((Math.random()*(maximum.x - minimum.x + 1)) + minimum.x),
						  Math.floor((Math.random()*(maximum.y - minimum.y + 1)) + minimum.y));
		
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.bounce.setTo(1, 1);
	},
	
	update : function() {
		this.move();
	},
	
	move : function() {
        if (!this.released) {
        	this.sprite.body.velocity.x = this.speed;
        	this.sprite.body.velocity.y = this.speed;
        	
        	this.released = true;
        }
    }
};
