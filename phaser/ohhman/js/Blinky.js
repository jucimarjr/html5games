Blinky = function () {
	this.sprite = null;
	this.speed = 10;
	
	this.direction; //LEFT, RIGHT, UP, DOWN
};

Blinky.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha blinky
		game.load.image('blinky', 'assets/images/blinky_36-36.png');
	},

	create : function() {
		//Adiciona o blinky na tela
		this.sprite = game.add.sprite(game.world.width/2, game.world.height/2, 'blinky');
	},
	
	update : function() {
		this.move();
	},
	
	
	//Move o blinky
	move : function() {
		//Move o blinky para testar (mudar quando tiver definido o movimento dele)
		this.sprite.x += this.speed;
	}
};
