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
		this.drawBorder();
	},
	
	update : function() {
	},
	
	
	//Desenha a área de extras
	drawExtras : function() {
		graphics = game.add.graphics(0, 0);
	    graphics.lineStyle(this.thicknessExtras, 0x000000, 1);
	    graphics.drawRect(0, this.thicknessExtras/2, game.world.width, 0);		
	},
	
	//Desenha as bordas da tela
	drawBorder : function() {
		graphics = game.add.graphics(0, 0);
	    graphics.lineStyle(this.thicknessBGame, 0x5F9596, 1);
	    graphics.drawRect(this.thicknessBGame/2, this.thicknessBGame/2 + this.thicknessExtras,
	    				  game.world.width - this.thicknessBGame,
	    				  game.world.height - this.thicknessExtras - this.thicknessBGame);
	}
};
