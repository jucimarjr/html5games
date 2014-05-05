Blinky = function () {
	this.sprite = null;
	this.speed = 20;
	
	this.direction = "LEFT"; //LEFT, RIGHT, UP, DOWN
};

Blinky.prototype = {
	preload : function() {
		//Carrega o sprite do fantasminha blinky
		game.load.image('blinky', fp_blinky);
	},

	create : function() {
		//Adiciona o blinky na tela
		this.sprite = game.add.sprite(game.world.width/2, game.world.height/2 - 126, 'blinky');
		game.physics.enable(this.sprite);

		//Impede que o blinky saia dos limites da tela
		this.sprite.body.collideWorldBounds = true;						
	},
	
	update : function() {
		this.moveRandomly();
		this.verifyMapCollision();
		this.verifyDecisionCollision();				
	},
	
	//Move o blinky
	moveRandomly : function() {
		//Move o blinky na horizontal (esquerda/direita)
		if (this.direction == "LEFT") {			
			this.sprite.body.setSize(30, 36, 35, 0);
			this.sprite.body.velocity.x = -this.speed;
			this.sprite.body.velocity.y = 0;						
		}
		if (this.direction == "RIGHT") {			
			this.sprite.body.velocity.x = this.speed;			
			this.sprite.body.velocity.y = 0;
		}
		
		//Move o blinky na vertical (cima/baixo)
		if (this.direction == "UP") {			
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = -this.speed;
		}
		if (this.direction == "DOWN") {				
		    this.sprite.body.setSize(36, 30, -1, -35);
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = this.speed;			
		}
	},
	
	//Verifica a colisão do blinky com o mapa
	verifyMapCollision : function() {		
		game.physics.arcade.collide(this.sprite, map.layer);
	},
	
	//Verifica a colisão do blinky com o ponto de decisao
	verifyDecisionCollision : function() {				
		game.physics.arcade.overlap(this.sprite, map.decision, this.setNewDirection, null, this);					
	},
	
	//Seta uma direção aleatória para o blinky
	setNewDirection : function() {
		console.log("colidiu com o ponto de decisao");
		this.sprite.body.velocity.x = 0;
		this.sprite.body.velocity.y = 0;
		this.direction = 'DOWN';
		/*console.log("colidiu com o ponto de decisao");
		
		if (this.direction == 'LEFT')
			this.direction = 'DOWN';
		else if (this.direction == 'DOWN')
			this.direction = 'RIGHT';
			
			*/
		/*var numberDirection = Math.round(1 + Math.random()*4);
		this.sprite.body.setSize(36, 36);
		switch(numberDirection){
			case 1:				
				this.direction = "LEFT";
				break;
			case 2:				
				this.direction = "RIGHT";
				break;
			case 3:				
				this.direction = "UP";
				break;
			case 4:
				this.direction = "DOWN";
				break;
		}		*/
		
	},
	
	//Remove a bolinha amarela após colisão com o Ohhman
	removeBall : function(player, ball) {		 
		 	
	     player.body.velocity.x = 0;			
		 player.body.velocity.y = 0;
		 player.body.x = player.body.x - 36;		 
		 this.direction = "";
		 
	},
	
	changeSpriteBodyCollision : function (){		
		if (this.direction == "LEFT")			
			//this.sprite.body.checkCollision.left = true;
			this.sprite.body.blocked.left = true;
			//this.sprite.body.setSize(0.1, 36, 0, 0);
		
		if (this.direction == "RIGHT")
			this.sprite.body.checkCollision.right = false;
			//this.sprite.body.blocked.left = true;
			//this.sprite.body.setSize(36, 1, 0, 0);
		
		if (this.direction == "UP")
			this.sprite.body.checkCollision.up = false;
			//this.sprite.body.blocked.down = true;
			//this.sprite.body.setSize(36, 1, 0, 0);
		
		if (this.direction == "DOWN")
			this.sprite.body.checkCollision.down = false;
			//this.sprite.body.blocked.up = true;
			//this.sprite.body.setSize(36, 1, 0, 0);
			
	},
	
	render : function () {
		//Mostra as informações do sprite
		game.debug.bodyInfo(this.sprite, 36, 36);
		//Mostra o corpo do sprite
		game.debug.body(this.sprite);		

	}
};
