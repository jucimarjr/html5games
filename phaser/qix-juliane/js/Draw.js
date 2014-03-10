Draw = function() {
	this.thicknessLine = 5;
	this.positionLines = new Array();
	
	//Ajusta a posição da linha
	this.fit;
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
		}
		else if (direction == "RIGHT") {
			position.x -= this.thicknessLine/2;
			this.savePositionLine(direction, position.x + this.thicknessLine/2, position.y);
		}
		else if (direction == "UP") {
			position.y += this.thicknessLine/2;
			this.savePositionLine(direction, position.x, position.y - this.thicknessLine/2);
		}
		else if (direction == "DOWN") {
			position.y -= this.thicknessLine/2;
			this.savePositionLine(direction, position.x, position.y + this.thicknessLine/2);
		}
		
		return position;
	},
	
	//Guarda a posição inicial da linha
	savePositionLine : function(direction, positionX, positionY) {
		if ((this.enterKey != direction) || (direction == "COLLISION")) {
			var total = this.positionLines.length;
			
			this.positionLines[total] = new coordinates();
			this.positionLines[total].x = positionX;
			this.positionLines[total].y = positionY;
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
		
	//Desenha um corpo quando as linhas fecharem um ciclo
	drawShape : function() {
		//Define o preenchimento do corpo (cor)
		graphics.beginFill(0x5F9596);
		//Define o estilo da linha (grossura, cor)
		graphics.lineStyle(this.thicknessLine, 0x5F9596, 1);

		//Define a posição inicial do corpo = graphics.moveTo(x, y)
		graphics.moveTo(this.positionLines[0].x, this.positionLines[0].y);
		
		//Define a posição intermediária até a final do corpo = graphics.lineTo(x, y)
		for (var i = 1; i < this.positionLines.length; i++)
			graphics.lineTo(this.positionLines[i].x, this.positionLines[i].y);
		graphics.endFill();
		
		this.positionLines = null;
		this.positionLines = new Array();
	},
	
	//Trata da colisão da linha com o corpo
	collideLineWithShape : function() {
		if (this.positionLines.length > 0) {
			if ((ball.sprite.x == this.positionLines[0].x) ||
				(ball.sprite.y + ball.sprite.width/2 + 0.45 >= this.positionLines[0].y)) {
				this.savePositionLine("COLLISION", ball.sprite.x + ball.sprite.width/2 + 0.45, ball.sprite.y);
				this.drawShape();
			}
		}
	},
	
	//Trata da colisão da linha com as bordas da tela
	collideLineWithBorder : function() {
		if (this.positionLines.length > 0) {
			if ((ball.sprite.x <= screenGame.thicknessBGame) ||
				(ball.sprite.x >= game.world.width - screenGame.thicknessBGame) ||
				(ball.sprite.y <= screenGame.thicknessBGame) ||
				(ball.sprite.y >= game.world.height - screenGame.thicknessBGame)) {
				
				this.savePositionLine("COLLISION", ball.sprite.x, ball.sprite.y + ball.sprite.width/2 + 0.45);
				this.savePositionLine("COLLISION", ball.sprite.x, game.world.height - screenGame.thicknessBGame);
				this.drawShape();
			}
		}
	}
};
