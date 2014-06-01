Blinky = function () {
	this.sprite = null;
	this.speed = 180;
	
	this.direction = "LEFT"; //LEFT, RIGHT, UP, DOWN
	
	this.changeDirection = false;
	
	this.valueXInTiles;
	this.valueYInTiles;
	
	this.leftTile = "FILL";
	this.rightTile = "FILL";
	this.upTile = "FILL";
	this.downTile = "FILL";
};

Blinky.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha blinky
		game.load.image('blinky', fp_blinky);
	},

	create : function() {
		//Adiciona o blinky na tela		
		this.sprite = game.add.sprite(396, 180, 'blinky');
		game.physics.enable(this.sprite);

		//Impede que o blinky saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;					
	},
	
	update : function() {		
		this.verifyMapCollision();
		//this.verifyDecisionCollision();			
		this.moveAccordingToMap();
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
		//game.physics.arcade.overlap(this.sprite, map.layer, this.setNewDirection, null, this);
		game.physics.arcade.overlap(this.sprite, map.layer);
	},
	
	//Verifica a colisão do blinky com o ponto de decisao
	verifyDecisionCollision : function() {				
		game.physics.arcade.collide(this.sprite, map.decision, this.correctPosition, null, this);					
	},
	
	//Seta uma direção aleatória para o blinky
	setNewDirection : function() {	
		var numberDirection = Math.round(1 + Math.random()*3);		
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
	},	
	
	//Seta uma direção aleatória para o blinky
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
	
	//Remove o Blinky do jogo
	kill : function() {
		this.sprite.kill();
	},
	
	//Seta yna durelçao para o Blinky de acordo com a posicao atual do Ohhman
	moveAccordingToMap : function(){		
		this.valueXInTiles = this.sprite.x/36;
		this.valueYInTiles = this.sprite.y/36;
		
		if (this.direction == "LEFT"){
			this.valueXInTiles -= 1; 						
			
			this.upTile = map.map.getTileAbove(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.downTile = map.map.getTileBelow(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.leftTile = map.map.getTileLeft(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);		
						
			this.upDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			this.downDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), (this.valueYInTiles + 1) * 36);
			this.leftDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
						
			if (!this.upTile && this.upDistance < this.downDistance && this.upDistance < this.leftDistance)
				this.direction = "UP";
			else if(!this.downTile && this.downDistance < this.upDistance && this.downDistance < this.leftDistance)
				this.direction = "DOWN";
			else if(!this.leftTile && this.leftDistance < this.upDistance && this.leftDistance < this.downDistance)
				this.direction = "LEFT";
			
			console.log(this.direction);												
		}
		if (this.direction == "RIGHT"){
			this.valueXInTiles += 1;
			
			this.upTile = map.map.getTileAbove(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.downTile = map.map.getTileBelow(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.righTile = map.map.getTileRight(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			
			this.upDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			this.downDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), (this.valueYInTiles + 1) * 36);
			this.rightDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
						
			if (!this.upTile && this.upDistance < this.downDistance && this.upDistance < this.rightDistance)
				this.direction = "UP";
			else if(!this.downTile && this.downDistance < this.upDistance && this.downDistance < this.rightDistance)
				this.direction = "DOWN";
			else if(!this.rightTile && this.rightDistance < this.upDistance && this.rightDistance < this.downDistance)
				this.direction = "RIGHT";
			
			console.log(this.direction);						
		}
		if (this.direction == "UP"){
			this.valueYInTiles -= 1;
			
			this.upTile = map.map.getTileAbove(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);			
			this.leftTile = map.map.getTileLeft(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.rightTile = map.map.getTileRight(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			
			this.upDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));			
			this.leftDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			this.rightDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
						
			if (!this.upTile && this.upDistance < this.leftDistance && this.upDistance < this.rightDistance)
				this.direction = "UP";
			else if(!this.leftTile && this.leftDistance < this.upDistance && this.leftDistance < this.rightDistance)
				this.direction = "LEFT";
			else if(!this.rightTile && this.rightDistance < this.upDistance && this.rightDistance < this.leftDistance)
				this.direction = "RIGHT";
						
			console.log(this.direction);												
		}
		if (this.direction == "DOWN"){
			this.valueYInTiles += 1;
			
			this.downTile = map.map.getTileBelow(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);			
			this.leftTile = map.map.getTileLeft(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.rightTile = map.map.getTileRight(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
						
			this.downDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, (this.valueXInTiles * 36), (this.valueYInTiles + 1) * 36);
			this.leftDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			this.rightDistance = game.physics.arcade.distanceToXY(ohhMan.sprite, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			
			if(!this.downTile && this.downDistance < this.leftDistance && this.downDistance < this.rightDistance)
				this.direction = "DOWN";
			else if(!this.leftTile && this.leftDistance < this.downDistance && this.leftDistance < this.rightDistance)
				this.direction = "LEFT";
			else if(!this.rightTile && this.rightDistance < this.downDistance && this.rightDistance < this.leftDistance)
				this.direction = "RIGHT";
			
			console.log(this.direction);					
		}								
	},
	
	render : function () {
		//Mostra as informações do sprite
		//game.debug.bodyInfo(this.sprite, 36, 36);
		//Mostra o corpo do sprite
		//game.debug.body(this.sprite);		

	}
};
