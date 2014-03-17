Draw = function() {
	this.thicknessLine = 5;
	this.positionLine = new Array();
	this.positionShape = new Array();
	
	//Ajusta a posição da linha
	this.fit;
	this.beforeDirection;
};

Draw.prototype = {
	preload : function() {
	},

	create : function() {
		//Ajusta a posição da linha
		this.fit = new coordinates();
		this.fit.x = 0.53*ball.sprite.width;
		this.fit.y = 0.53*ball.sprite.height;
	},
	
	update : function(direction, positionInitial) {
		this.drawLine(direction, positionInitial);
		this.collideLineWithShape();
		//this.collideLineWithBorder();
	},
	
	
	//Configura a posição da linha
	setLine : function(direction, positionInitial) {
		//Guarda a posição da linha
		var position = new coordinates();
		
		//Ajusta a posição da linha para ficar no centro da bolinha
		position.x = positionInitial.x + this.fit.x;
		position.y = positionInitial.y + this.fit.y;
		
		//Calcula a posição da linha de acordo com a movimentação da bolinha
		if (direction == "LEFT") {
			position.x += this.thicknessLine/2;
			this.savePositionLine(direction, position.x - this.thicknessLine/2, position.y);
			this.beforeDirection = "LEFT";
		}
		else if (direction == "RIGHT") {
			position.x -= this.thicknessLine/2;
			this.savePositionLine(direction, position.x + this.thicknessLine/2, position.y);
			this.beforeDirection = "RIGHT";
		}
		else if (direction == "UP") {
			position.y += this.thicknessLine/2;
			this.savePositionLine(direction, position.x, position.y - this.thicknessLine/2);
			this.beforeDirection = "UP";
		}
		else if (direction == "DOWN") {
			position.y -= this.thicknessLine/2;
			this.savePositionLine(direction, position.x, position.y + this.thicknessLine/2);
			this.beforeDirection = "DOWN";
		}
		
		return position;
	},
	
	//Guarda a posição inicial da linha
	savePositionLine : function(direction, positionX, positionY) {
		if ((direction != this.beforeDirection) || (direction == "COLLISION")) {
			var total = this.positionLine.length;
			
			this.positionLine[total] = new coordinates();
			this.positionLine[total].x = positionX;
			this.positionLine[total].y = positionY;
		}
	},
	
	//Desenha a linha
	drawLine : function(direction, positionInitial) {
		if ((direction == "LEFT") || (direction == "RIGHT") || (direction == "UP") || (direction == "DOWN")) {
			//Captura a posição inicial da linha
			var position = this.setLine(direction, positionInitial);

			//Define o estilo da linha (grossura, cor)
		    graphics.lineStyle(this.thicknessLine, 0x0B968F);
		    
			//Define a posição inicial da linha = graphics.moveTo(x, y)
			graphics.moveTo(position.x, position.y);
			//Define a posição final da linha = graphics.lineTo(x, y)
			graphics.lineTo(ball.sprite.x + this.fit.x, ball.sprite.y + this.fit.y);
		}
	},
	
	//Guarda a posição do corpo
	savePositionShape : function(direction, positionX, positionY) {
		var total = this.positionShape.length;

		for (var i = 0; i < this.positionLine.length; i++) {
			this.positionShape[total + i] = new coordinates();
			this.positionShape[total + i].x = this.positionLine[i].x;
			this.positionShape[total + i].y = this.positionLine[i].y;
		}
	},
		
	//Desenha um corpo quando as linhas fecharem um ciclo
	drawShape : function() {
		//Define o preenchimento do corpo (cor)
		graphics.beginFill(0x5F9596);
		//Define o estilo da linha (grossura, cor)
		graphics.lineStyle(this.thicknessLine, 0x5F9596, 1);

		//Define a posição inicial do corpo = graphics.moveTo(x, y)
		graphics.moveTo(this.positionLine[0].x, this.positionLine[0].y);
		
		//Define a posição intermediária até a final do corpo = graphics.lineTo(x, y)
		for (var i = 1; i < this.positionLine.length; i++)
			graphics.lineTo(this.positionLine[i].x, this.positionLine[i].y);
		graphics.endFill();
		
		this.savePositionShape();
		this.positionLine = new Array();
	},
	
	//Trata da colisão da linha com o corpo
	collideLineWithShape : function() {
		if (this.positionLine.length > 0) {
			if ((ball.sprite.x == this.positionLine[0].x) ||
				(ball.sprite.y + ball.sprite.width/2 + 0.45 >= this.positionLine[0].y)) {
				this.savePositionLine("COLLISION", ball.sprite.x + ball.sprite.width/2 + 0.45, ball.sprite.y);
				this.drawShape();
			}
		}
	},
	
	//Trata da colisão da linha com as bordas da tela
	collideLineWithBorder : function() {
		if (this.positionLine.length > 0) {
			if ((ball.sprite.x <= screenGame.thicknessBGame) ||
				(ball.sprite.x >= game.world.width - screenGame.thicknessBGame) ||
				(ball.sprite.y <= screenGame.thicknessBGame) ||
				(ball.sprite.y >= game.world.height+screenGame.thicknessExtras - screenGame.thicknessBGame)) {
				
				this.savePositionLine("COLLISION", ball.sprite.x, ball.sprite.y + ball.sprite.width/2 + 0.45);
				this.savePositionLine("COLLISION", ball.sprite.x, game.world.height+screenGame.thicknessExtras - screenGame.thicknessBGame);
				this.drawShape();
			}
		}
	}
};
