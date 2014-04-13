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
		this.sprite = game.add.sprite(game.world.width/2, game.world.height/2 - 125, 'blinky');
		game.physics.enable(this.sprite);

		//Impede que o blinky saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;
	},
	
	update : function() {
		this.moveRandomly();
		this.verifyMapCollision();
	},
	
	
	//Move o blinky
	moveRandomly : function() {
		//Move o blinky para testar (mudar quando tiver definido o movimento dele)
		this.sprite.x -= this.speed;
	},
	
	//Verifica a colisão do ohhMan com o mapa
	verifyMapCollision : function() {
		game.physics.arcade.collide(this.sprite, map1.layer);
	}
};
