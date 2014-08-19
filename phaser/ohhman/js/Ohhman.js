Ohhman = function () {
	this.sprite = null;
	this.speed = 180;
	
	this.direction = "LEFT"; //LEFT, RIGHT, UP, DOWN
	this.nextDirection = "LEFT";	
	this.oldDirection;
	
	this.score = 0;
	this.scoreText = null;
};

Ohhman.prototype = {
	preload : function() {
		//Carrega o sprite do ohhMan
		game.load.image('ohhMan', fp_ohhMan);
		
		//Carrega o audio para colisao com as bolinhas amarelas
		game.load.audio('aud_chomp', fp_aud_chomp);
		game.load.audio('aud_death', fp_aud_death);
		game.load.audio('aud_eatghost', fp_aud_eatghost);
	},

	create : function() {
		//Adiciona o ohhMan na tela		
		this.sprite = game.add.sprite(396, 360, 'ohhMan');
		game.physics.enable(this.sprite);

		//Impede que o ohhMan saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;		
		
		//Faz a camera seguir o Ohhman
		game.camera.follow(this.sprite);
		
		//Modo scared inicialmente falso
		game.mood = false;
	},
	
	update : function() {		
		this.verifyMapCollision();	
		this.moveByKeyboard();		
		this.verifyGhostCollision();
		this.verifyBallCollision();		
		this.verifyDecisionCollision();		
		this.verifyFearCollision();
		this.verifyScaredGhostCollision();
	},
	
	
	//Move o ohhMan
	moveByKeyboard : function() {	
		this.oldDirection = this.direction;
		
		//Move o OhhMan na horizontal (esquerda/direita)
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.nextDirection = "LEFT";
			
			//Mode o Ohhman apenas quando colidir com a camada de decisao
			if ((this.direction == "RIGHT") || (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0)){
				this.sprite.body.velocity.x = -this.speed;
				this.sprite.body.velocity.y = 0;
			}			
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.nextDirection = "RIGHT";
			
			//Mode o Ohhman apenas quando colidir com a camada de decisao
			if ((this.direction == "LEFT") || (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0)){				
				this.sprite.body.velocity.x = this.speed;
				this.sprite.body.velocity.y = 0;
			}			
		}
		
		//Move o ohhMan na vertical (cima/baixo)
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.nextDirection = "UP";
			
			//Mode o Ohhman apenas quando colidir com a camada de decisao
			if ((this.direction == "DOWN") || (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0)){
				this.sprite.body.velocity.x = 0;
				this.sprite.body.velocity.y = -this.speed;
			}			
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.nextDirection = "DOWN";
			
			//Mode o Ohhman apenas quando colidir com a camada de decisao
			if ((this.direction == "UP") || (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0)){
				this.sprite.body.velocity.x = 0;
				this.sprite.body.velocity.y = this.speed;
			}			
		}
	},
	
	//Verifica a colisão do ohhMan com o mapa
	verifyMapCollision : function() {
		//game.physics.arcade.collide(this.sprite, map.layer);		
		//game.physics.arcade.collide(this.sprite, map.layer, this.keepDirection, null, this);
		game.physics.arcade.collide(this.sprite, map.layer);
	},
	
	//Verifica a colisão do ohhMan com os fantasminhas
	verifyGhostCollision : function() {		
		if (game.mood == false){
			if (this.checkOverlap(this.sprite, blinky.sprite) ||
				this.checkOverlap(this.sprite, clyde.sprite) ||
				this.checkOverlap(this.sprite, inkey.sprite) ||
				this.checkOverlap(this.sprite, pinky.sprite) ||
				this.checkOverlap(this.sprite, blinky2.sprite) ||
				this.checkOverlap(this.sprite, clyde2.sprite) ||
				this.checkOverlap(this.sprite, inkey2.sprite) ||
				this.checkOverlap(this.sprite, pinky2.sprite) ||
				this.checkOverlap(this.sprite, blinky3.sprite) ||
				this.checkOverlap(this.sprite, clyde3.sprite) ||
				this.checkOverlap(this.sprite, inkey3.sprite) ||
				this.checkOverlap(this.sprite, pinky3.sprite) ||
				this.checkOverlap(this.sprite, blinky4.sprite) ||
				this.checkOverlap(this.sprite, clyde4.sprite) ||
				this.checkOverlap(this.sprite, inkey4.sprite) ||
				this.checkOverlap(this.sprite, pinky4.sprite)
			){				
				game.add.audio('aud_death', 1).play();
				life.decreaseLivesNumber();				
			}
		}
	},
	
	//Verifica se 2 sprites se sobreporam, ou seja, se eles colidiram
	//VER DEPOIS: VERIFICAR QUAL O MELHOR ARQUIVO PRA ESTE MÉDOTO FICAR
	checkOverlap : function(spriteA, spriteB) {
	    var boundsA = spriteA.getBounds();
	    var boundsB = spriteB.getBounds();

	    return Phaser.Rectangle.intersects(boundsA, boundsB);
	},
	
	//Verifica a colisão do ohhMan com as bolinhas amarelas
	verifyBallCollision : function() {						
		game.physics.arcade.overlap(this.sprite, map.balls, this.removeBall, null, this);			
	},
	
	//Remove a bolinha amarela após colisão com o Ohhman
	removeBall : function(player, ball) {
		game.add.audio('aud_chomp', 1).play();		
		ball.kill();		
		score.punctuateBall();		 
		this.verifyBallQuantity();
	},
	
	//Verifica a colisão do ohhman com o ponto de decisao
	verifyDecisionCollision : function() {				
		game.physics.arcade.collide(this.sprite, map.decision, this.correctPosition, null, this);					
	},
	
	correctPosition : function(player, decision) {				
		if (decision.body.checkCollision.left)
			this.sprite.x += 7;
		
		if (decision.body.checkCollision.right)
			this.sprite.x -= 7;
			
		if (decision.body.checkCollision.down)
			this.sprite.y -= 7;
		
		if (decision.body.checkCollision.up)
			this.sprite.y += 7;
		
		this.keepDirection();
	},		
	
	//Continua o movimento apos colidir com a camada de decisao
	keepDirection : function() {			
		if (this.nextDirection == "LEFT") {
			this.direction = "LEFT";
			this.sprite.body.velocity.x = -this.speed;
			this.sprite.body.velocity.y = 0;
		}		
		if (this.nextDirection == "RIGHT") {
			this.direction = "RIGHT";
			this.sprite.body.velocity.x = this.speed;
			this.sprite.body.velocity.y = 0;
		}		
		if (this.nextDirection == "UP") {		
			this.direction = "UP";
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = -this.speed;
		}		
		if (this.nextDirection == "DOWN") {	
			this.direction = "DOWN";
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = this.speed;
		}	
	},
	
	//Remove o Ohhman do jogo
	kill : function() {
		this.sprite.kill();
	},
	
	//Verifica a colisão do ohhMan com os quadrados grandes
	verifyFearCollision : function() {					
		game.physics.arcade.overlap(this.sprite, map.fear, this.removeFear, null, this);						
	},
	
	//Remove o quadrado grande após colisão com o Ohhman
	removeFear : function(player, fear) {		 		 		 
		fear.kill();		
		score.punctuateFear();		
		scaredGhost.changeMood();
	},
	
	verifyBallQuantity : function() {
		if (map.balls.total <=0){
			game.state.start('sceneWin');
		}
	},
	
	verifyScaredGhostCollision : function () {
		if (game.mood == true){
			if (game.physics.arcade.overlap(this.sprite, blinky.sprite)){
				game.add.audio('aud_eatghost', 1).play();			
				blinky.kill();
				score.punctuateScaredGhost();				
			}
			if (game.physics.arcade.overlap(this.sprite, clyde.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				clyde.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, inkey.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				inkey.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, pinky.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				pinky.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, blinky2.sprite)){				
				game.add.audio('aud_eatghost', 1).play();
				blinky2.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, clyde2.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				clyde2.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, inkey2.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				inkey2.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, pinky2.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				pinky2.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, blinky3.sprite)){				
				game.add.audio('aud_eatghost', 1).play();
				blinky3.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, clyde3.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				clyde3.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, inkey3.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				inkey3.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, pinky3.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				pinky3.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, blinky4.sprite)){				
				game.add.audio('aud_eatghost', 1).play();
				blinky4.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, clyde4.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				clyde4.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, inkey4.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				inkey4.kill();
				score.punctuateScaredGhost();
			}
			if (game.physics.arcade.overlap(this.sprite, pinky4.sprite)) {
				game.add.audio('aud_eatghost', 1).play();
				pinky4.kill();
				score.punctuateScaredGhost();
			}
		}
	},
	
	render : function () {
		//Mostra as informações do sprite
		game.debug.bodyInfo(this.sprite, 36, 36);
		//Mostra o corpo do sprite
		game.debug.body(this.sprite);		

	}
};
