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
		
		//Fixa a camera nas vidas
		this.sprite.fixedToCamera = true;
	},
	
	decreaseLivesNumber : function(){		
		
		ohhMan.kill();
		blinky.kill();
		clyde.kill();
		inkey.kill();
		pinky.kill();	
		
		blinky2.kill();
		clyde2.kill();
		inkey2.kill();
		pinky2.kill();	
		
		blinky3.kill();
		clyde3.kill();
		inkey3.kill();
		pinky3.kill();	
		
		blinky4.kill();
		clyde4.kill();
		inkey4.kill();
		pinky4.kill();	
			
		this.sprite.getFirstAlive().kill();		
		this.sprite.create(35 * this.positionLife + 3, 1, 'emptyLife');	
		
		this.positionLife++;
		if(this.positionLife == 3){			
			game.state.start('sceneLose');
		}					
				
		ohhMan.create();
		blinky.create(396, 180);
		clyde.create(396, 286);
		inkey.create(432, 540);
		pinky.create(36, 360);				
		blinky2.create(1224, 108);
		clyde2.create(1188, 252);
		inkey2.create(1260, 540);
		pinky2.create(828, 432);	
		blinky3.create(36, 900);
		clyde3.create(648, 1152);
		inkey3.create(612, 828);
		pinky3.create(504, 612);
		blinky4.create(1152, 756);
		clyde4.create(1548, 864);
		inkey4.create(828, 1008);
		pinky4.create(1368, 1152);		
	}
};
