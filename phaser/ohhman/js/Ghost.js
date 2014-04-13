Ghost = function () {
	this.sprite1 = null;
	this.speed = 10;
	
	this.direction; //LEFT, RIGHT, UP, DOWN
};

Ghost.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha blinky
		game.load.image('blinky', fp_blinky);
	},

	create : function() {
		//Adiciona o blinky na tela
		this.sprite1 = game.add.sprite(game.world.width/2, game.world.height/2 - 120, 'blinky');
		game.physics.enable(this.sprite1);

		//Impede que o blinky saia dos limites da tela
		this.sprite1.body.collideWorldBounds = true;
	},
	
	update : function() {
		this.moveRandomly();
	},
	
	
	//Move o blinky
	moveRandomly : function() {
		//Move o blinky para testar (mudar quando tiver definido o movimento dele)
		this.sprite1.x -= this.speed;
	}
};
