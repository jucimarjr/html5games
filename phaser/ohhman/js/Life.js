Life = function () {
	this.sprite = null;	
	this.positionLife = 0;
};

Life.prototype = {
	preload : function() {
		//Carrega o sprite das vidas
		game.load.image('life', fp_life);
		game.load.image('emptyLife', fp_emptyLife);
	},

	create : function() {
		//Adiciona a vida na tela				
		this.sprite = game.add.group();
		for(var i = 0; i < 3; i++){
			this.sprite.create(35 * i + 3, 1, 'life');				
		}
	},
	
	decreaseLivesNumber : function(){		
		
		ohhMan.sprite.kill();
		blinky.sprite.kill();
		clyde.sprite.kill();
		inkey.sprite.kill();
		pinky.sprite.kill();	
			
		this.sprite.getFirstAlive().kill();
		game.add.sprite(35 * this.positionLife + 3, 1, 'emptyLife');
		this.positionLife++;
		if(this.sprite.countLiving() <= 0){			
			game.state.start('sceneLose');
		}					
				
		ohhMan.create();
		blinky.create();
		clyde.create();
		inkey.create();
		pinky.create();		
	}
};
