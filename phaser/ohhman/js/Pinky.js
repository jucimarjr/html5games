Pinky = function () {
	this.sprite = null;
	this.speed = 200;
	
	this.direction = "DOWN"; //LEFT, RIGHT, UP, DOWN
};

Pinky.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha pinky
		game.load.image('pinky', fp_pinky);
	},

	create : function() {
		//Adiciona o pinky na tela
		this.sprite = game.add.sprite(37, game.height/2 + 61, 'pinky');
		game.physics.enable(this.sprite);

		//Impede que o pinky saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;
	},
	
	update : function(layer) {
		this.moveRandomly();
		this.verifyMapCollision(layer);
	},
	
	//Move o pinky
	moveRandomly : function() {
		//Move o pinky na horizontal (esquerda/direita)
		if (this.direction ==  "LEFT") {			
			this.sprite.body.velocity.x = -this.speed;
			this.sprite.body.velocity.y = 0;
		}
		if (this.direction == "RIGHT") {			
			this.sprite.body.velocity.x = this.speed;			
			this.sprite.body.velocity.y = 0;
		}
		
		//Move o pinky na vertical (cima/baixo)
		if (this.direction == "UP") {			
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = -this.speed;
		}
		if (this.direction == "DOWN") {			
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = this.speed;
		}
	
	},
	
	//Verifica a colisão do pinky com o mapa
	verifyMapCollision : function(layer) {		
		game.physics.arcade.overlap(this.sprite, map.layer, this.setNewDirection, null, this);
	},
	
	//Seta uma direção aleatória para o pinky
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
	},
	
	//Seta uma direção aleatória para o pinky
	correctPosition : function(player, decision) {						
		if (decision.body.checkCollision.left)
			this.sprite.x += 6;
		
		if (decision.body.checkCollision.right)
			this.sprite.x -= 6;
			
		if (decision.body.checkCollision.down)
			this.sprite.y -= 6;
		
		if (decision.body.checkCollision.up)
			this.sprite.y += 6;
		
		this.setNewDirection();
	},
	
	//Remove o Pinky do jogo
	kill : function() {
		this.sprite.kill();
	}
};
