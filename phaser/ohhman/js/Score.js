Score = function () {
	this.score = 0;		
	this.scoreText = null;
};

Score.prototype = {
	preload : function() {
		
	},

	create : function() {
		//Insere pontuação na tela
		var style = { font: "25px Arial", fill: "#ffffff", align: "right" };
		this.scoreText = game.add.text(game.width/2, 10 , "" + this.score, style);	
		
		//Fixa a camera na pontuação
		this.scoreText.fixedToCamera = true;
	},
	
	//Soma dez pontos a cada bolinha removida
	punctuateBall : function () {
		this.score += 10;
	    this.scoreText.setText( "" + this.score );
	},
	
	//Soma vinte e cinco pontos a cada quadrado grande removido
	punctuateFear : function () {
		this.score += 25;
	    this.scoreText.setText( "" + this.score );
	},
	
	//Soma dozentos pontos a cada colisao com um fantasma no modo medo
	punctuateScaredGhost : function () {
		this.score += 200;
	    this.scoreText.setText( "" + this.score );
	}
};
