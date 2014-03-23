Screen = function() {
	this.thicknessExtras = 50;
	this.thicknessBGame = 30;
};

Screen.prototype = {
	preload : function() {
	},

	create : function() {
		//Muda a cor de fundo
		game.stage.backgroundColor = '#FAF1D2';
		
		this.drawExtras();
		this.drawTopBorder();
		this.drawBottomBorder();
		this.drawLeftBorder();
		this.drawRightBorder();
	},
	
	update : function() {
	},
	
	
	//Desenha a área de extras
	drawExtras : function() {
		graphics = game.add.graphics(0, 0);
	    graphics.lineStyle(this.thicknessExtras, 0x000000, 1);
	    graphics.drawRect(0, this.thicknessExtras/2, game.world.width, 0);		
	},
	
	//Desenha a borda superior
	drawTopBorder : function() {
		var positionBorder = new Array;
		
		positionBorder[0] = new coordinates();
		positionBorder[0].x = 0;
		positionBorder[0].y = game.world.height - this.thicknessBGame;
		
		positionBorder[1] = new coordinates();
		positionBorder[1].x = game.world.width;
		positionBorder[1].y = game.world.height - this.thicknessBGame;
		
		positionBorder[2] = new coordinates();
		positionBorder[2].x = game.world.width;
		positionBorder[2].y = game.world.height;
		
		positionBorder[3] = new coordinates();
		positionBorder[3].x = 0;
		positionBorder[3].y = game.world.height;
		
		shape.draw(positionBorder);
	},
	
	//Desenha a borda inferior
	drawBottomBorder : function() {
		var positionBorder = new Array;
		
		positionBorder[0] = new coordinates();
		positionBorder[0].x = 0;
		positionBorder[0].y = this.thicknessExtras;
		
		positionBorder[1] = new coordinates();
		positionBorder[1].x = game.world.width;
		positionBorder[1].y = this.thicknessExtras;
		
		positionBorder[2] = new coordinates();
		positionBorder[2].x = game.world.width;
		positionBorder[2].y = this.thicknessExtras + this.thicknessBGame;
		
		positionBorder[3] = new coordinates();
		positionBorder[3].x = 0;
		positionBorder[3].y = this.thicknessExtras + this.thicknessBGame;
		
		shape.draw(positionBorder);
	},

	//Desenha a borda da esquerda
	drawLeftBorder : function() {
		var positionBorder = new Array;
		
		positionBorder[0] = new coordinates();
		positionBorder[0].x = 0;
		positionBorder[0].y = this.thicknessExtras + this.thicknessBGame;
		
		positionBorder[1] = new coordinates();
		positionBorder[1].x = this.thicknessBGame;
		positionBorder[1].y = this.thicknessExtras + this.thicknessBGame;
		
		positionBorder[2] = new coordinates();
		positionBorder[2].x = this.thicknessBGame;
		positionBorder[2].y = game.world.height - this.thicknessBGame;
		
		positionBorder[3] = new coordinates();
		positionBorder[3].x = 0;
		positionBorder[3].y = game.world.height - this.thicknessBGame;
		
		shape.draw(positionBorder);
	},

	//Desenha a borda da direita
	drawRightBorder : function() {
		var positionBorder = new Array;
		
		positionBorder[0] = new coordinates();
		positionBorder[0].x = game.world.width - this.thicknessBGame;
		positionBorder[0].y = this.thicknessExtras + this.thicknessBGame;
		
		positionBorder[1] = new coordinates();
		positionBorder[1].x = game.world.width;
		positionBorder[1].y = this.thicknessExtras + this.thicknessBGame;
		
		positionBorder[2] = new coordinates();
		positionBorder[2].x = game.world.width;
		positionBorder[2].y = game.world.height - this.thicknessBGame;
		
		positionBorder[3] = new coordinates();
		positionBorder[3].x = game.world.width - this.thicknessBGame;
		positionBorder[3].y = game.world.height - this.thicknessBGame;
		
		shape.draw(positionBorder);
	}
};
