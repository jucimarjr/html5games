Ohhman = function () {
	this.sprite = null;
	this.speed = 9;
	
	this.direction; //LEFT, RIGHT, UP, DOWN
};

Ohhman.prototype = {
	preload : function() {
		//Carrega o sprite do ohhMan
		game.load.image('ohhMan', fp_ohhMan);
	},

	create : function() {
		//Adiciona o ohhMan na tela
		this.sprite = game.add.sprite(0, 0, 'ohhMan');
		game.physics.enable(this.sprite);

		//Impede que o ohhMan saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;
	},
	
	update : function() {
		this.moveByKeyboard();
	},
	
	
	//Move o ohhMan
	moveByKeyboard : function() {
		//Move o ohhMan na horizontal (esquerda/direita)
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.direction = "LEFT";
			this.sprite.x -= this.speed;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.direction = "RIGHT";
			this.sprite.x += this.speed;
		}
		
		//Move o ohhMan na vertical (cima/baixo)
		else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.direction = "UP";
			this.sprite.y -= this.speed;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.direction = "DOWN";
			this.sprite.y += this.speed;
		}
	}
};
