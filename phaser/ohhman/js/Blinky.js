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
		this.verifyDecisionCollision();
	},
	
	//Move o blinky
	moveRandomly : function() {
		//Move o blinky na horizontal (esquerda/direita)
		if (this.direction == "LEFT") {			
			this.sprite.body.velocity.x = -this.speed;
			this.sprite.body.velocity.y = 0;
		}
		if (this.direction == "RIGHT") {			
			this.sprite.body.velocity.x = this.speed;			
			this.sprite.body.velocity.y = 0;
		}
		
		//Move o blinky na vertical (cima/baixo)
		if (this.direction == "UP") {			
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = -this.speed;
		}
		if (this.direction == "DOWN") {			
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = this.speed;
		}
	},
	
	//Verifica a colisão do blinky com o mapa
	verifyMapCollision : function() {		
		game.physics.arcade.collide(this.sprite, map.layer);
	},
	
	//Verifica a colisão do blinky com o ponto de decisao
	verifyDecisionCollision : function() {		
		console.log("colidiu com o ponto de decisao");
		game.physics.arcade.overlap(this.sprite, map.decision, this.setNewDirection, null, this);
	},
	
	//Seta uma direção aleatória para o blinky
	setNewDirection : function() {
		var numberDirection = Math.round(1 + Math.random()*4);
		
		switch(numberDirection){
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
