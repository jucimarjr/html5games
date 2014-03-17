Shape = function() {
	this.position = new Array();
	this.thickness = 5;
};

Shape.prototype = {
	preload : function() {
	},

	create : function() {
	},
	
	update : function(direction, positionInitial) {
	},
	
	
	//Guarda a posição do corpo
	savePosition : function(positionLine) {
		var total = this.position.length;
		this.position[total] = new Array();
		
		//Guarda o positionLine num índice de this.position
		for ( var i = 0; i < positionLine.length; i++) {
			this.position[total].push(positionLine[i]);
		}
	},
		
	//Desenha um corpo quando as linhas fecharem um ciclo
	draw : function(positionLine) {
		//Define o preenchimento do corpo (cor)
		graphics.beginFill(0x5F9596);
		//Define o estilo da linha (grossura, cor)
		graphics.lineStyle(this.thickness, 0x5F9596, 1);

		//Define a posição inicial do corpo = graphics.moveTo(x, y)
		graphics.moveTo(positionLine[0].x, positionLine[0].y);
		//Define a posição intermediária até a final do corpo = graphics.lineTo(x, y)
		for (var i = 1; i < positionLine.length; i++)
			graphics.lineTo(positionLine[i].x, positionLine[i].y);
		graphics.endFill();
		
		this.savePosition(positionLine);
	}
};
