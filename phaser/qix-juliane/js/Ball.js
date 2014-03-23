Ball = function() {
	this.sprite;
	this.speed = 10;

	this.direction; //LEFT, RIGHT, UP, DOWN
	this.positionInitial;
	
	this.alive = false;
	this.collided = false;
};

Ball.prototype = {
	preload : function() {
		//Carrega o sprite da bolinha
		game.load.image('ball', 'assets/images/ball.png');
	},

	create : function() {
		//Adiciona a bolinha na tela
		this.sprite = game.add.sprite(0, 0, 'ball');
		
		//Re-posiciona a bolinha para ficar no centro da tela
		this.sprite.reset(game.world.width/2 - 0.5*this.sprite.width,
						  game.world.height - 1.5*this.sprite.height);
	},
	
	update : function() {
		this.move();
	},
	
	
	//Move a bolinha
	move : function() {
		this.positionInitial = this.sprite.position;
		this.alive = true;
		
		//Move a bolinha na horizontal (esquerda/direita)
		if ((game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) && (this.direction != "RIGHT")) {
			this.direction = "LEFT";
			this.sprite.x -= this.speed;
		}
		else if ((game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) && (this.direction != "LEFT")) {
			this.direction = "RIGHT";
			this.sprite.x += this.speed;
		}
		
		//Move a bolinha na vertical (cima/baixo)
		else if ((game.input.keyboard.isDown(Phaser.Keyboard.UP)) && (this.direction != "DOWN")) {
			this.direction = "UP";
			this.sprite.y -= this.speed;
		}
		else if ((game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) && (this.direction != "UP")) {
			this.direction = "DOWN";
			this.sprite.y += this.speed;
		}
		else this.alive = false;
	}
};
