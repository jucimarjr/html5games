Ohhman = function () {
	this.sprite = null;
	this.speed = 10;
	
	this.direction; //LEFT, RIGHT, UP, DOWN
};

Ohhman.prototype = {
	preload : function() {
		//Carrega o sprite do OhhMan
		game.load.image('ohhMan', 'assets/images/ohhMan_36-36.png');
	},

	create : function() {
		//Adiciona o OhhMan na tela
		this.sprite = game.add.sprite(0, 0, 'ohhMan');
	},
	
	update : function() {
		this.move();
	},
	
	
	//Move o OhhMan
	move : function() {
		//Move o OhhMan na horizontal (esquerda/direita)
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.direction = "LEFT";
			this.sprite.x -= this.speed;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.direction = "RIGHT";
			this.sprite.x += this.speed;
		}
		
		//Move o OhhMan na vertical (cima/baixo)
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
