Clyde = function () {
	this.sprite = null;
	this.speed = 200;
	
	this.direction = "UP"; //LEFT, RIGHT, UP, DOWN
};

Clyde.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha clyde
		game.load.image('clyde', fp_clyde);
	},

	create : function(xPosition, yPosition) {
		//Adiciona o clyde na tela		
		this.sprite = game.add.sprite(xPosition, yPosition, 'clyde');
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
	
	//Seta uma direção aleatória para o clyde
	setNewDirection : function() {
		var number = Math.round(1 + Math.random()*2);	
		this.valueXInTiles = Math.round(this.sprite.x/36);
		this.valueYInTiles = Math.round(this.sprite.y/36);		
		
		if (this.direction == "LEFT"){			 									
			this.upTile = map.map.getTileAbove(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.downTile = map.map.getTileBelow(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.leftTile = map.map.getTileLeft(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);		
			
			if (this.upTile == null && number == 3)
				this.direction = "UP";
			else if (this.downTile == null && number == 4)
				this.direction = "DOWN";
			else if (this.leftTile == null && number == 1)
				this.direction = "LEFT";							
		}
		else if (this.direction == "RIGHT"){						
			this.upTile = map.map.getTileAbove(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.downTile = map.map.getTileBelow(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.rightTile = map.map.getTileRight(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);			
			
			if (this.upTile == null && number == 3)
				this.direction = "UP";
			else if (this.downTile == null && number === 4)
				this.direction = "DOWN";
			else if (this.rightTile == null && number == 2)
				this.direction = "RIGHT";						
		}
		else if (this.direction == "UP"){			
			this.upTile = map.map.getTileAbove(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);			
			this.leftTile = map.map.getTileLeft(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.rightTile = map.map.getTileRight(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			
			if (this.upTile == null && number == 3)
				this.direction = "UP";
			if (this.leftTile == null && number == 1)
				this.direction = "LEFT";
			if (this.rightTile == null && number == 2)
				this.direction = "RIGHT";				
		}
		else if (this.direction == "DOWN"){						
			this.downTile = map.map.getTileBelow(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);			
			this.leftTile = map.map.getTileLeft(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.rightTile = map.map.getTileRight(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
						
			if (this.downTile == null && number == 4)
				this.direction = "DOWN";
			if (this.leftTile == null && number == 1)
				this.direction = "LEFT";
			if (this.rightTile == null && number == 2)
				this.direction = "RIGHT";						
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
