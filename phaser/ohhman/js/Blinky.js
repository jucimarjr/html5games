Blinky = function () {
	this.sprite = null;
	this.speed = 100;
	
	this.direction = "LEFT"; //LEFT, RIGHT, UP, DOWN
	
	this.valueXInTiles;
	this.valueYInTiles;
	
	this.leftTile = "FILL";
	this.rightTile = "FILL";
	this.upTile = "FILL";
	this.downTile = "FILL";
	
	this.leftDistance = 2000;
	this.rightDistance = 2000;
	this.upDistance = 2000;
	this.downDistance = 2000;
};

Blinky.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha blinky
		game.load.image('blinky', fp_blinky);		
	},

	create : function(xPosition, yPosition, type) {
		//Adiciona o blinky na tela		
		this.sprite = game.add.sprite(xPosition, yPosition, type);
		game.physics.enable(this.sprite);

		//Impede que o blinky saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;					
	},
	
	update : function() {		
		this.verifyMapCollision();
		this.verifyDecisionCollision();					
		this.moveRandomly();		
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
		game.physics.arcade.collide(this.sprite, map.layer, this.setNewDirection, null, this);		
	},
	
	//Verifica a colisão do blinky com o ponto de decisao
	verifyDecisionCollision : function() {						
		game.physics.arcade.collide(this.sprite, map.decision, this.correctPosition, null, this);					
	},	
	
	//Corrige a posicao do blinky apos colidir com a camada de decisao
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
	
	//Remove o Blinky do jogo
	kill : function() {
		this.sprite.kill();
	},
	
	//Seta uma direcaoo para o blinky de acordo com a posicao atual do Ohhman
	setNewDirection : function(){				
		this.valueXInTiles = Math.round(this.sprite.x/36);
		this.valueYInTiles = Math.round(this.sprite.y/36);
		
		if (this.direction == "LEFT"){			 									
			this.upTile = map.map.getTileAbove(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.downTile = map.map.getTileBelow(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.leftTile = map.map.getTileLeft(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);		
			
			if (this.upTile == null)
				this.upDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.downTile == null)
				this.downDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), (this.valueYInTiles + 1) * 36);
			if (this.leftTile == null)
				this.leftDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));			
			
			if (this.upDistance < this.downDistance && this.upDistance < this.leftDistance)
				this.direction = "UP";
			else if (this.downDistance < this.leftDistance)
				this.direction = "DOWN";
			else if (this.leftDistance < this.downDistance)
				this.direction = "LEFT";
			else
				this.direction = "DOWN";
		}
		else if (this.direction == "RIGHT"){						
			this.upTile = map.map.getTileAbove(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.downTile = map.map.getTileBelow(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.rightTile = map.map.getTileRight(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);			
			
			if (this.upTile == null)
				this.upDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.downTile == null)
				this.downDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.rightTile == null)
				this.rightDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			
			if (this.upDistance < this.downDistance && this.upDistance < this.rightDistance)
				this.direction = "UP";
			else if (this.downDistance < this.rightDistance)
				this.direction = "DOWN";
			else if (this.rightDistance < this.downDistance)
				this.direction = "RIGHT";			
			else
				this.direction = "UP";			
		}
		else if (this.direction == "UP"){			
			this.upTile = map.map.getTileAbove(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);			
			this.leftTile = map.map.getTileLeft(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.rightTile = map.map.getTileRight(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			
			if (this.upTile == null)
				this.upDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));			
			if (this.leftTile == null)
				this.leftDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null)
				this.rightDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			
			if (this.upDistance < this.leftDistance && this.upDistance < this.rightDistance)
				this.direction = "UP";
			else if (this.leftDistance < this.rightDistance)
				this.direction = "LEFT";
			else if (this.rightDistance < this.leftDistance)
				this.direction = "RIGHT";
			else
				this.direction = "LEFT";
		}
		else if (this.direction == "DOWN"){						
			this.downTile = map.map.getTileBelow(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);			
			this.leftTile = map.map.getTileLeft(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.rightTile = map.map.getTileRight(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
						
			if (this.downTile == null)
				this.downDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.leftTile == null)
				this.leftDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null)
				this.rightDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			
			if (this.downDistance < this.leftDistance && this.downDistance < this.rightDistance)
				this.direction = "DOWN";
			else if (this.leftDistance < this.rightDistance)
				this.direction = "LEFT";
			else if (this.rightDistance < this.leftDistance)
				this.direction = "RIGHT";
			else
				this.direction = "RIGHT";			
		}		
		this.upTile = "FILL";
		this.downTile = "FILL";
		this.leftTile = "FILL";
		this.rightTile = "FILL";

		this.leftDistance = 2000;
		this.rightDistance = 2000;
		this.upDistance = 2000;
		this.downDistance = 2000;
	},
};
