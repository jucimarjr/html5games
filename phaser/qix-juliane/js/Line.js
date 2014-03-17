Line = function() {
	this.position = new Array();
	this.thickness = 5;

	this.beforeDirection;
	this.fit;
};

Line.prototype = {
	preload : function() {
	},

	create : function(spriteBall) {
		//Ajusta a posição da linha
		this.fit = new coordinates();
		this.fit.x = 0.53*spriteBall.width;
		this.fit.y = 0.53*spriteBall.height;
	},
	
	update : function(spriteBall, direction, positionInitial) {
		var position = this.setPosition(direction, positionInitial);
		this.draw(spriteBall, position);
	},
	
	
	//Configura a posição da linha
	setPosition : function(direction, positionInitial) {
		//Guarda a posição da linha
		var position = new coordinates();
		
		//Ajusta a posição da linha para ficar no centro da bolinha
		position.x = positionInitial.x + this.fit.x;
		position.y = positionInitial.y + this.fit.y;
		
		//Calcula a posição da linha de acordo com a movimentação da bolinha
		if (direction == "LEFT") {
			position.x += this.thickness/2;
			this.savePosition(direction, position.x - this.thickness/2, position.y);
			this.beforeDirection = "LEFT";
		}
		else if (direction == "RIGHT") {
			position.x -= this.thickness/2;
			this.savePosition(direction, position.x + this.thickness/2, position.y);
			this.beforeDirection = "RIGHT";
		}
		else if (direction == "UP") {
			position.y += this.thickness/2;
			this.savePosition(direction, position.x, position.y - this.thickness/2);
			this.beforeDirection = "UP";
		}
		else if (direction == "DOWN") {
			position.y -= this.thickness/2;
			this.savePosition(direction, position.x, position.y + this.thickness/2);
			this.beforeDirection = "DOWN";
		}
		
		return position;
	},
	
	//Guarda a posição inicial da linha
	savePosition : function(direction, positionX, positionY) {
		if ((direction != this.beforeDirection) || (direction == "COLLISION")) {
			var total = this.position.length;
			
			this.position[total] = new coordinates();
			this.position[total].x = positionX;
			this.position[total].y = positionY;
			
//Enquanto a linha não mudar de posição, collided = true (GAMBI :p)
ball.collided = false;
//console.log("x: " + positionX + " y: " + positionY);
		}
	},
	
	//Desenha a linha
	draw : function(spriteBall, position) {
		//Define o estilo da linha (grossura, cor)
	    graphics.lineStyle(this.thickness, 0x5F9596);
	    
		//Define a posição inicial da linha = graphics.moveTo(x, y)
		graphics.moveTo(position.x, position.y);
		//Define a posição final da linha = graphics.lineTo(x, y)
		graphics.lineTo(spriteBall.x + this.fit.x, spriteBall.y + this.fit.y);
	}
};
