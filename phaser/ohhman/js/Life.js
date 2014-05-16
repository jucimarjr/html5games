Life = function () {
	this.sprite = null;	
};

Life.prototype = {
	preload : function() {
		//Carrega o sprite das vidas
		game.load.image('lives', fp_lives);
	},

	create : function() {
		//Adiciona a vida na tela				
		this.sprite = game.add.group();
		for(var i = 0; i < 3; i++){
			this.sprite.create(35 * i + 3, 1, 'lives');				
		}
	}
};
