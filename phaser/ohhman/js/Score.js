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
	},
	
	//Soma dez pontos a cada bolinha removida
	punctuate : function () {
		this.score += 10;
	    this.scoreText.setText( "" + this.score );
	}
};
