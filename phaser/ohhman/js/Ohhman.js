Ohhman = function () {
	this.sprite = null;
	this.speed = 200;
	
	this.direction; //LEFT, RIGHT, UP, DOWN
};

Ohhman.prototype = {
	preload : function() {
		//Carrega o sprite do ohhMan
		game.load.image('ohhMan', fp_ohhMan);
	},

	create : function() {
		//Adiciona o ohhMan na tela
		this.sprite = game.add.sprite(game.world.width/2 - 15, game.height/2 + 63, 'ohhMan');
		game.physics.enable(this.sprite);

		//Impede que o ohhMan saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;
	},
	
	update : function(layer) {
		this.moveByKeyboard();
		this.verifyMapCollision(layer);
		this.verifyGhostCollision();
	},
	
	
	//Move o ohhMan
	moveByKeyboard : function() {
		//Move o ohhMan na horizontal (esquerda/direita)
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.direction = "LEFT";
			this.sprite.body.velocity.x = -this.speed;
			this.sprite.body.velocity.y = 0;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.direction = "RIGHT";
			this.sprite.body.velocity.x = this.speed;
			this.sprite.body.velocity.y = 0;
		}
		
		//Move o ohhMan na vertical (cima/baixo)
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.direction = "UP";
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = -this.speed;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.direction = "DOWN";
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = this.speed;
		}
	},
	
	//Verifica a colisão do ohhMan com o mapa
	verifyMapCollision : function(layer) {
		game.physics.arcade.collide(this.sprite, layer);
	},
	
	//Verifica a colisão do ohhMan com os fantasminhas
	verifyGhostCollision : function() {
		if (this.checkOverlap(this.sprite, blinky.sprite) ||
			this.checkOverlap(this.sprite, clyde.sprite) ||
			this.checkOverlap(this.sprite, inkey.sprite) ||
			this.checkOverlap(this.sprite, pinky.sprite))
			
			game.state.start('sceneLose');
	},
	
	//Verifica se 2 sprites se sobreporam, ou seja, se eles colidiram
	//VER DEPOIS: VERIFICAR QUAL O MELHOR ARQUIVO PRA ESTE MÉDOTO FICAR
	checkOverlap : function(spriteA, spriteB) {
	    var boundsA = spriteA.getBounds();
	    var boundsB = spriteB.getBounds();

	    return Phaser.Rectangle.intersects(boundsA, boundsB);
	}
};
