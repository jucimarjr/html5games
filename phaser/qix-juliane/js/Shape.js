Shape = function() {
	this.bodyShape = new Array();
	this.position = new Array();
	this.thickness = 5;
};

Shape.prototype = {
	preload : function() {
	},

	create : function() {
	},
	
	update : function() {
	},
	
	
	//Guarda a posição do corpo
	savePosition : function(positionLine) {
		var total = this.position.length;
		this.position[total] = new Array();
		
		//Guarda o positionLine num índice de this.position
		for ( var i = 0; i < positionLine.length; i++)
			this.position[total].push(positionLine[i]);
	},
		
	//Desenha um corpo quando as linhas fecharem um ciclo
	draw : function(positionLine) {
		//Define o preenchimento do corpo (cor)
		graphics.beginFill(0x5F9596);
		//Define o estilo da linha (grossura, cor)
		graphics.lineStyle(this.thickness, 0x5F9596, 1);
		//graphics.lineStyle(this.thickness, 0x000000, 1);

		//Define a posição inicial do corpo = graphics.moveTo(x, y)
		graphics.moveTo(positionLine[0].x, positionLine[0].y);
		//Define a posição intermediária até a final do corpo = graphics.lineTo(x, y)
		for (var i = 1; i < positionLine.length; i++)
			graphics.lineTo(positionLine[i].x, positionLine[i].y);
		graphics.endFill();
		
		this.savePosition(positionLine);
		this.doBody();
	},
	
	//Cria um corpo para o desenho anterior
	doBody : function() {
		var i = this.position.length - 1;
		this.bodyShape[i] = new Array();

		var position = new coordinates();
		var index = 0;
		var width;
		var height;
		
		j = 0;
		while (j < shape.position[i].length-2) {
			//Cria o "corpo" (sprite)
			this.bodyShape[i][j] = game.add.sprite(0, 0, null);
			this.bodyShape[i][j].body.immovable = true;
			
			index = j + 2;
			if (j == shape.position[i].length - 2)
				index = 0;
			
			//Define a coordenada X
			if (shape.position[i][j].x <= shape.position[i][j+1].x)
				position.x = shape.position[i][j].x;
			else position.x = shape.position[i][j+1].x;
			//Define a coordenada Y			
			if (shape.position[i][j].y <= shape.position[i][index].y)
				position.y = shape.position[i][j].y;
			else position.y = shape.position[i][index].y;
			
			//Define a largura e a altura
			if (shape.position[i][j].x != shape.position[i][j+1].x) {
				width = Math.abs(shape.position[i][j+1].x - shape.position[i][j].x);
				height = Math.abs(shape.position[i][j+2].y - shape.position[i][j].y);
			}
			else {
				width = Math.abs(shape.position[i][j+2].x - shape.position[i][j].x);
				height = Math.abs(shape.position[i][j+1].y - shape.position[i][j].y);
			}

			//Seta as propriedades
			this.bodyShape[i][j].x = position.x;
			this.bodyShape[i][j].y = position.y;
			this.bodyShape[i][j].width = width;
			this.bodyShape[i][j].height = height;
			
			j += 3;
		}
	}
};
