Life = function () {
	//this.sprite = null;	
};

Life.prototype = {
	preload : function() {
		//Carrega o sprite das vidas
		game.load.image('lives', fp_lives);
	},

	create : function() {
		//Adiciona a vida na tela				
		lives = game.add.group();
		for(var i = 0; i < 3; i++){
			lives.create(35 * i + 3, 1, 'lives');				
		}
	}
};
