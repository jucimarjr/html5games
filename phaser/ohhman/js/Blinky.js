Blinky = function () {
	this.sprite = null;
	this.speed = 200;
	
	this.direction = "LEFT"; //LEFT, RIGHT, UP, DOWN
};

Blinky.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha blinky
		game.load.image('blinky', fp_blinky);
	},

	create : function() {
		//Adiciona o blinky na tela
		this.sprite = game.add.sprite(game.world.width/2, game.world.height/2 - 126, 'blinky');
		game.physics.enable(this.sprite);

		//Impede que o blinky saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;
	},
	
	update : function() {
		this.moveRandomly();
		this.verifyMapCollision();
	},
	
	//Move o blinky
	moveRandomly : function() {
		//Move o blinky na horizontal (esquerda/direita)
		if (this.direction ==  "LEFT") {
			this.direction = "LEFT";
			this.sprite.body.velocity.x = -this.speed;
			this.sprite.body.velocity.y = 0;
		}
		
		else if (this.direction == "RIGHT") {
			this.direction = "RIGHT";
			this.sprite.body.velocity.x = this.speed;			
			this.sprite.body.velocity.y = 0;
		}
		
		//Move o blinky na vertical (cima/baixo)
		else if (this.direction == "UP") {
			this.direction = "UP";
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = -this.speed;
		}
		else if (this.direction == "DOWN") {
			this.direction = "DOWN";
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = this.speed;
		}
	
	},
	
	//Verifica a colisão do blinkt com o mapa
	verifyMapCollision : function() {		
		game.physics.arcade.overlap(this.sprite, map1.layer, this.setNewDirection, null, this);
	},
	
	setNewDirection : function() {
		var number = Math.round(1 + Math.random()*4);
		
		switch(number){
			case 1:
				this.direction = "LEFT";
				break;
			case 2:
				this.direction = "RIGHT";
				break;
			case 3:
				this.direction = "UP";
				break;
			case 4:
				this.direction = "DOWN";
				break;
		}		
	}
};
