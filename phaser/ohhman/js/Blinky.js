Blinky = function () {
	this.sprite = null;
	this.speed = 200;
	
	this.direction = "LEFT"; //LEFT, RIGHT, UP, DOWN
	
	this.changeDirection = false;
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
			//this.sprite.body.setSize(36, 36, 35, 0);				
			this.sprite.body.velocity.x = -this.speed;
			this.sprite.body.velocity.y = 0;			
		}
		if (this.direction == "RIGHT") {			
			//this.sprite.body.setSize(36, 36, -35, 0);
			this.sprite.body.velocity.x = this.speed;			
			this.sprite.body.velocity.y = 0;
		}
		
		//Move o blinky na vertical (cima/baixo)
		if (this.direction == "UP") {			
			//this.sprite.body.setSize(30, 30, -1, 35);	
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = -this.speed;
		}
		if (this.direction == "DOWN") {				
		    //this.sprite.body.setSize(30, 30, -1, -30);			
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = this.speed;			
		}
	},
	
	//Verifica a colisão do blinky com o mapa
	verifyMapCollision : function() {					
		console.log("colidiu com mapa");
		game.physics.arcade.overlap(this.sprite, map.layer, this.setNewDirection, null, this);
	},
	
	//Verifica a colisão do blinky com o ponto de decisao
	verifyDecisionCollision : function() {				
		game.physics.arcade.collide(this.sprite, map.decision, this.correctPosition, null, this);					
	},
	
	//Seta uma direção aleatória para o blinky
	setNewDirection : function() {	
		var numberDirection = Math.round(1 + Math.random()*3);
		console.log(numberDirection);		
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
		}				
	},	
	
	//Seta uma direção aleatória para o blinky
	correctPosition : function(player, decision) {				
		console.log("colidiu com o ponto de decisao");				
		console.log(decision.body.checkCollision);
		/*if (this.direction == 'RIGHT'){
			this.sprite.x += 6;
			this.direction = 'UP';			
		}
		else if (this.direction == 'UP'){
			this.sprite.y -= 6;
			this.direction = 'LEFT';
		}
		else if (this.direction == 'LEFT'){
			this.sprite.x -= 6;
			this.direction = 'RIGHT';
		}
		*/
		/*else if (this.direction == 'RIGHT')
			this.direction = 'DOWN';
		*/
			//this.sprite.body.setSize(10, 10);
			//this.sprite.body.offset.setTo(0,0);
			
		
		if (decision.body.checkCollision.left)
			this.sprite.x += 6;
		
		if (decision.body.checkCollision.right)
			this.sprite.x -= 6;
			
		if (decision.body.checkCollision.down)
			this.sprite.y += 6;
		
		if (decision.body.checkCollision.up)
			this.sprite.y -= 6;
		
		this.setNewDirection();
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
