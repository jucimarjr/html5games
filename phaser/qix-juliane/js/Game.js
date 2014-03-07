var Game = {};

Game = function () {
};

Game.prototype = {
	preload:function() {
		//Carrega os sprites do jogo
		game.load.image('ball', 'assets/images/ball.png');
	},

	create:function() {
		var sizeBall = 15;
		
		//Posiciona o sprite da bolinha na tela
		game.add.sprite(game.world.width/2, game.world.height - 1.5*sizeBall, 'ball');
	},
	
	upload:function() {
	}
};
