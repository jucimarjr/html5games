Ohhman = function () {
	this.sprite = null;
	this.speed = 200;
	
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
	},

	create : function() {
		//Adiciona o ohhMan na tela
		this.sprite = game.add.sprite(game.world.width/2 - 18, game.height/2 + 60, 'ohhMan');
		game.physics.enable(this.sprite);

		//Impede que o ohhMan saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;
		
		//Insere pontuação na tela
		var style = { font: "25px Arial", fill: "#ffffff", align: "right" };
		this.scoreText = game.add.text(game.width/2, 10 , "" + this.score, style);	
	},
	
	update : function() {				
		this.moveByKeyboard();
		this.verifyMapCollision();
		this.verifyGhostCollision();
		this.verifyBallCollision();		
		this.verifyDecisionCollision();		
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
		game.physics.arcade.collide(this.sprite, map.layer, this.keepDirection, null, this);
	},
	
	//Verifica a colisão do ohhMan com os fantasminhas
	verifyGhostCollision : function() {
		if (this.checkOverlap(this.sprite, blinky.sprite) ||
			this.checkOverlap(this.sprite, clyde.sprite) ||
			this.checkOverlap(this.sprite, inkey.sprite) ||
			this.checkOverlap(this.sprite, pinky.sprite))
			
			//game.state.start('sceneLose');
			this.verifyLivesNumber();
			//game.time.events.add(2200, this.verifyLivesNumber(), this);
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
		//this.sprite.body.setSize(6, 6);		
		game.physics.arcade.overlap(this.sprite, map.balls, this.removeBall, null, this);				
		//this.sprite.body.setSize(36, 36);
	},
	
	//Remove a bolinha amarela após colisão com o Ohhman
	removeBall : function(player, ball) {		 		 		 
		 ball.kill();		 		 
		 this.punctuate();
	},
	
	//Soma dez pontos a cada bolinha removida
	punctuate : function () {
		this.score += 10;
	    this.scoreText.setText( "" + this.score );
	},
	
	//Verifica a colisão do ohhman com o ponto de decisao
	verifyDecisionCollision : function() {				
		game.physics.arcade.collide(this.sprite, map.decision, this.correctPosition, null, this);					
	},
	
	correctPosition : function(player, decision) {				
		if (decision.body.checkCollision.left)
			this.sprite.x += 6;
		
		if (decision.body.checkCollision.right)
			this.sprite.x -= 6;
			
		if (decision.body.checkCollision.down)
			this.sprite.y -= 6;
		
		if (decision.body.checkCollision.up)
			this.sprite.y += 6;
		
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

	verifyLivesNumber : function(){		
		
		ohhMan.sprite.kill();
		blinky.sprite.kill();
		clyde.sprite.kill();
		inkey.sprite.kill();
		pinky.sprite.kill();	
			
		lives.getFirstAlive().kill();
		if(lives.countLiving() <= 0){			
			game.state.start('sceneLose');
		}					
				
		ohhMan.create();
		blinky.create();
		clyde.create();
		inkey.create();
		pinky.create();		
	},
	
	render : function () {
		//Mostra as informações do sprite
		game.debug.bodyInfo(this.sprite, 36, 36);
		//Mostra o corpo do sprite
		game.debug.body(this.sprite);		

	}
};
