Qix = function() {
	this.sprite = null;
	this.speed = 300;
	
	this.released = false;
};

Qix.prototype = {
	preload : function() {
		//Carrega o sprite do qix
		game.load.image('qix', 'assets/images/qix.png');
	},

	create : function() {
		//Adiciona o qix na tela
		this.sprite = game.add.sprite(0, 0,'qix');
		this.setPosition();
		
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.bounce.setTo(1, 1);
	},
	
	update : function() {
		this.move();
	},

	
	//Configura o posicionamento do qix
	setPosition : function() {
		//Configura o posicionamento, tendo em vista a tela oficial do jogo
		var minimum = new coordinates();
		minimum.x = screenGame.thicknessBGame + this.sprite.width;
		minimum.y = screenGame.thicknessExtras + screenGame.thicknessBGame + this.sprite.height;
		
		var maximum = new coordinates();
		maximum.x = game.world.width - screenGame.thicknessBGame - this.sprite.width;
		maximum.y = game.world.height - screenGame.thicknessBGame - this.sprite.height;

		//Re-posiciona aleatoriamente o qix
		this.sprite.reset(Math.floor((Math.random()*(maximum.x - minimum.x + 1)) + minimum.x),
						  Math.floor((Math.random()*(maximum.y - minimum.y + 1)) + minimum.y));
	},
	
	//Move o qix, ricocheteia-o na tela
	move : function() {
        if (!this.released) {
        	this.sprite.body.velocity.x = this.speed;
        	this.sprite.body.velocity.y = this.speed;
        	
        	this.released = true;
        }
    }
};
