Clyde = function () {
	this.sprite = null;
	this.speed = 80;
	
	this.direction = "UP"; //LEFT, RIGHT, UP, DOWN
};

Clyde.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha clyde
		game.load.image('clyde', fp_clyde);
	},

	create : function(xPosition, yPosition, type) {
		//Adiciona o clyde na tela		
		this.sprite = game.add.sprite(xPosition, yPosition, type);
		game.physics.enable(this.sprite);

		//Impede que o clyde saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;
	},
	
	update : function() {		
		this.verifyMapCollision();
		this.verifyDecisionCollision();	
		this.moveRandomly();
	},
	
	//Move o clyde
	moveRandomly : function() {
		//Move o clyde na horizontal (esquerda/direita)
		if (this.direction ==  "LEFT") {			
			this.sprite.body.velocity.x = -this.speed;
			this.sprite.body.velocity.y = 0;
		}
		if (this.direction == "RIGHT") {			
			this.sprite.body.velocity.x = this.speed;			
			this.sprite.body.velocity.y = 0;
		}
		
		//Move o clyde na vertical (cima/baixo)
		if (this.direction == "UP") {			
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = -this.speed;
		}
		if (this.direction == "DOWN") {
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = this.speed;
		}
	},
	
	//Verifica a colisão do clyde com o mapa
	verifyMapCollision : function() {				
		game.physics.arcade.collide(this.sprite, map.layer, this.setNewDirection, null, this);		
	},
	
	//Verifica a colisão do clyde com o ponto de decisao
	verifyDecisionCollision : function() {				
		game.physics.arcade.collide(this.sprite, map.decision, this.correctPosition, null, this);					
	},
	
	//Seta uma direção aleatória para o Clyde
	setNewDirection : function() {
		var number = Math.round(1 + Math.random()*3);
		
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
	
	//Seta uma direção aleatória para o clyde
	correctPosition : function(player, decision) {						
		if (decision.body.checkCollision.left)
			this.sprite.x += 7;
		
		if (decision.body.checkCollision.right)
			this.sprite.x -= 7;
			
		if (decision.body.checkCollision.down)
			this.sprite.y -= 7;
		
		if (decision.body.checkCollision.up)
			this.sprite.y += 7;
		
		this.setNewDirection();
	},
	
	//Remove o Clyde do jogo
	kill : function() {
		this.sprite.kill();
	}
};
