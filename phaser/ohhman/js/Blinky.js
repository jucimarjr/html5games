Blinky = function () {
	this.sprite = null;
	this.speed = 10;
	
	this.direction; //LEFT, RIGHT, UP, DOWN
};

Blinky.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha blinky
		game.load.image('blinky', fp_blinky);
	},

	create : function() {
		//Adiciona o blinky na tela
		this.sprite = game.add.sprite(game.world.width/2, game.world.height/2, 'blinky');
	},
	
	update : function() {
		this.moveRandomly();
	},
	
	
	//Move o blinky
	moveRandomly : function() {
		//Move o blinky para testar (mudar quando tiver definido o movimento dele)
		this.sprite.x += this.speed;
	}
};
