Pinky = function () {
	this.sprite = null;
	this.speed = 100;
	
	this.direction = "DOWN"; //LEFT, RIGHT, UP, DOWN
	
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

Pinky.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha pinky
		game.load.image('pinky', fp_pinky);
	},

	create : function(xPosition, yPosition, type) {
		//Adiciona o pinky na tela		
		this.sprite = game.add.sprite(xPosition, yPosition, type);
		game.physics.enable(this.sprite);

		//Impede que o pinky saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;
	},
	
	update : function(layer) {
		this.verifyMapCollision();
		this.verifyDecisionCollision();	
		this.moveRandomly();		
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
		game.physics.arcade.collide(this.sprite, map.layer, this.setNewDirection, null, this);
	},	
	
	//Verifica a colisão do pinky com o ponto de decisao
	verifyDecisionCollision : function() {						
		game.physics.arcade.collide(this.sprite, map.decision, this.correctPosition, null, this);					
	},	
	
	//Corrige a posicao do pinky apos colidir com a camada de decisao
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
	
	//Remove o Pinky do jogo
	kill : function() {
		this.sprite.kill();
	},
	
	//Seta uma direcaoo para o blinky de acordo com a posicao atual do Ohhman
	setNewDirection : function(){				
		this.valueXInTiles = Math.round(this.sprite.x/36);
		this.valueYInTiles = Math.round(this.sprite.y/36);
		this.vx = this.sprite.x/36;
		this.vy = this.sprite.y/36;		
		
		if (this.direction == "LEFT"){			 									
			this.upTile = map.map.getTileAbove(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.downTile = map.map.getTileBelow(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);
			this.leftTile = map.map.getTileLeft(map.map.getLayerIndex("Wall") , this.valueXInTiles, this.valueYInTiles);	
				
			if (this.upTile == null && ohhMan.direction == "LEFT")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.upTile == null && ohhMan.direction == "RIGHT")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.upTile == null && ohhMan.direction == "UP")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.upTile == null && ohhMan.direction == "DOWN")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			
			if (this.downTile == null && ohhMan.direction == "LEFT")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.downTile == null && ohhMan.direction == "RIGHT")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.downTile == null && ohhMan.direction == "UP")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.downTile == null && ohhMan.direction == "DOWN")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			
			if (this.leftTile == null && ohhMan.direction == "LEFT")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.leftTile == null && ohhMan.direction == "RIGHT")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.leftTile == null && ohhMan.direction == "UP")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.leftTile == null && ohhMan.direction == "DOWN")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			
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

			if (this.upTile == null && ohhMan.direction == "LEFT")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.upTile == null && ohhMan.direction == "RIGHT")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.upTile == null && ohhMan.direction == "UP")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.upTile == null && ohhMan.direction == "DOWN")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			
			if (this.downTile == null && ohhMan.direction == "LEFT")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.downTile == null && ohhMan.direction == "RIGHT")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.downTile == null && ohhMan.direction == "UP")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.downTile == null && ohhMan.direction == "DOWN")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			
			if (this.rightTile == null && ohhMan.direction == "LEFT")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null && ohhMan.direction == "RIGHT")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null && ohhMan.direction == "UP")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null && ohhMan.direction == "DOWN")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			
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
			
			
			if (this.upTile == null && ohhMan.direction == "LEFT")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.upTile == null && ohhMan.direction == "RIGHT")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.upTile == null && ohhMan.direction == "UP")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			if (this.upTile == null && ohhMan.direction == "DOWN")
				this.upDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, (this.valueXInTiles * 36), ((this.valueYInTiles - 1) * 36));
			
			if (this.leftTile == null && ohhMan.direction == "LEFT")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.leftTile == null && ohhMan.direction == "RIGHT")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.leftTile == null && ohhMan.direction == "UP")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.leftTile == null && ohhMan.direction == "DOWN")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			
			if (this.rightTile == null && ohhMan.direction == "LEFT")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null && ohhMan.direction == "RIGHT")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null && ohhMan.direction == "UP")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null && ohhMan.direction == "DOWN")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));			
			
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
			
			if (this.downTile == null && ohhMan.direction == "LEFT")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.downTile == null && ohhMan.direction == "RIGHT")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.downTile == null && ohhMan.direction == "UP")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			if (this.downTile == null && ohhMan.direction == "DOWN")
				this.downDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, (this.valueXInTiles * 36), ((this.valueYInTiles + 1) * 36));
			
			if (this.leftTile == null && ohhMan.direction == "LEFT")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.leftTile == null && ohhMan.direction == "RIGHT")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.leftTile == null && ohhMan.direction == "UP")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			if (this.leftTile == null && ohhMan.direction == "DOWN")
				this.leftDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, ((this.valueXInTiles - 1) * 36), (this.valueYInTiles * 36));
			
			if (this.rightTile == null && ohhMan.direction == "LEFT")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null && ohhMan.direction == "RIGHT")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x + 144, ohhMan.sprite.y, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null && ohhMan.direction == "UP")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x - 144, ohhMan.sprite.y - 144, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
			if (this.rightTile == null && ohhMan.direction == "DOWN")
				this.rightDistance = this.distancePlusFourXY(ohhMan.sprite.x, ohhMan.sprite.y + 144, ((this.valueXInTiles + 1) * 36), (this.valueYInTiles * 36));
		
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
	
	distancePlusFourXY: function (dx, dy, x, y) {
		this._dx = dx- x;
        this._dy = dy - y;
		
        return Math.sqrt(this._dx * this._dx + this._dy * this._dy);

    },

};
