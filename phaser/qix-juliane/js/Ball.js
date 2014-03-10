Ball = function() {
	this.sprite = null;
	this.speed = 10;

	this.direction; //LEFT, RIGHT, UP, DOWN
	this.positionInitial;
};

Ball.prototype = {
	preload : function() {
		//Carrega os sprites do jogo
		game.load.image('ball', 'assets/images/ball.png');
	},

	create : function() {
		//Adiciona o sprite da bolinha na tela
		this.sprite = game.add.sprite(0, 0, 'ball');
		
		//Re-posiciona a bolinha para ficar no centro da tela
		this.sprite.reset(game.world.width/2 - 0.5*this.sprite.width,
						  game.world.height+screenGame.thicknessExtras - 1.5*this.sprite.height);
	},
	
	update : function() {
		this.move();
		this.collideBallWithWall();
	},
	
	
	//Move a bolinha
	move : function() {
		this.positionInitial = this.sprite.position;
		
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
	},
	
	//Trata da colisão da bolinha com a parede do jogo
	collideBallWithWall : function() {
		if (this.sprite.x <= 0.5*this.sprite.width)
			this.sprite.x = 0.5*this.sprite.width;
		if (this.sprite.x >= game.world.width - 1.5*this.sprite.width)
			this.sprite.x = game.world.width - 1.5*this.sprite.width;
		if (this.sprite.y <= screenGame.thicknessExtras + 0.5*this.sprite.height)
			this.sprite.y = screenGame.thicknessExtras + 0.5*this.sprite.height;
		if (this.sprite.y >= game.world.height+screenGame.thicknessExtras - 1.5*this.sprite.height)
			this.sprite.y = game.world.height+screenGame.thicknessExtras - 1.5*this.sprite.height;
	}
};
