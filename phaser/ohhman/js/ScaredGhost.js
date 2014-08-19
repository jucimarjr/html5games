ScaredGhost = function () {
};

ScaredGhost.prototype = {
	preload : function() {
		//Carrega o sprite do fantasma em modo scared		
		game.load.image('scared_ghost', fp_scared_ghost);
	},

	create : function() {		
	},
	
	changeMood : function(){
		game.mood = true;
		
		blinkyX = blinky.sprite.x;
		blinkyY = blinky.sprite.y;
		clydeX = clyde.sprite.x;
		clydeY = clyde.sprite.y;
		inkeyX = inkey.sprite.x;
		inkeyY = inkey.sprite.y;
		pinkyX = pinky.sprite.x;
		pinkyY = pinky.sprite.y;
		
		blinky2X = blinky2.sprite.x;
		blinky2Y = blinky2.sprite.y;
		clyde2X = clyde2.sprite.x;
		clyde2Y = clyde2.sprite.y;
		inkey2X = inkey2.sprite.x;
		inkey2Y = inkey2.sprite.y;
		pinky2X = pinky2.sprite.x;
		pinky2Y = pinky2.sprite.y;
		
		blinky3X = blinky3.sprite.x;
		blinky3Y = blinky3.sprite.y;
		clyde3X = clyde3.sprite.x;
		clyde3Y = clyde3.sprite.y;
		inkey3X = inkey3.sprite.x;
		inkey3Y = inkey3.sprite.y;
		pinky3X = pinky3.sprite.x;
		pinky3Y = pinky3.sprite.y;
		
		blinky4X = blinky4.sprite.x;
		blinky4Y = blinky4.sprite.y;
		clyde4X = clyde4.sprite.x;
		clyde4Y = clyde4.sprite.y;
		inkey4X = inkey4.sprite.x;
		inkey4Y = inkey4.sprite.y;
		pinky4X = pinky4.sprite.x;
		pinky4Y = pinky4.sprite.y;
	
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
				
		blinky.create(blinkyX, blinkyY, 'scared_ghost');	
		clyde.create(clydeX, clydeY, 'scared_ghost');
		inkey.create(inkeyX, inkeyY, 'scared_ghost');
		pinky.create(pinkyX, pinkyY, 'scared_ghost');				
		blinky2.create(blinky2X, blinky2Y, 'scared_ghost');
		clyde2.create(clyde2X, clyde2Y, 'scared_ghost');
		inkey2.create(inkey2X, inkey2Y, 'scared_ghost');
		pinky2.create(pinky2X, pinky2Y, 'scared_ghost');	
		blinky3.create(blinky3X, blinky3Y, 'scared_ghost');
		clyde3.create(clyde3X, clyde3Y, 'scared_ghost');
		inkey3.create(inkey3X, inkey3Y, 'scared_ghost');
		pinky3.create(pinky3X, pinky3Y, 'scared_ghost');
		blinky4.create(blinky4X, blinky4Y, 'scared_ghost');
		clyde4.create(clyde4X, clyde4Y, 'scared_ghost');
		inkey4.create(inkey4X, inkey4Y, 'scared_ghost');
		pinky4.create(pinky4X, pinky4Y, 'scared_ghost');
		
		game.time.events.add(Phaser.Timer.SECOND * 4, this.comeBackMood, this);
	},
	
	comeBackMood : function(){
		game.mood = false;
		
		blinkyX = blinky.sprite.x;
		blinkyY = blinky.sprite.y;		
		clydeX = clyde.sprite.x;
		clydeY = clyde.sprite.y;
		inkeyX = inkey.sprite.x;
		inkeyY = inkey.sprite.y;
		pinkyX = pinky.sprite.x;
		pinkyY = pinky.sprite.y;
		
		blinky2X = blinky2.sprite.x;
		blinky2Y = blinky2.sprite.y;
		clyde2X = clyde2.sprite.x;
		clyde2Y = clyde2.sprite.y;
		inkey2X = inkey2.sprite.x;
		inkey2Y = inkey2.sprite.y;
		pinky2X = pinky2.sprite.x;
		pinky2Y = pinky2.sprite.y;
		
		blinky3X = blinky3.sprite.x;
		blinky3Y = blinky3.sprite.y;
		clyde3X = clyde3.sprite.x;
		clyde3Y = clyde3.sprite.y;
		inkey3X = inkey3.sprite.x;
		inkey3Y = inkey3.sprite.y;
		pinky3X = pinky3.sprite.x;
		pinky3Y = pinky3.sprite.y;
		
		blinky4X = blinky4.sprite.x;
		blinky4Y = blinky4.sprite.y;
		clyde4X = clyde4.sprite.x;
		clyde4Y = clyde4.sprite.y;
		inkey4X = inkey4.sprite.x;
		inkey4Y = inkey4.sprite.y;
		pinky4X = pinky4.sprite.x;
		pinky4Y = pinky4.sprite.y;
	
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
				
		blinky.create(blinkyX, blinkyY, 'blinky');
		clyde.create(clydeX, clydeY, 'clyde');
		inkey.create(inkeyX, inkeyY, 'inkey');
		pinky.create(pinkyX, pinkyY, 'pinky');				
		blinky2.create(blinky2X, blinky2Y, 'blinky');
		clyde2.create(clyde2X, clyde2Y, 'clyde');
		inkey2.create(inkey2X, inkey2Y, 'inkey');
		pinky2.create(pinky2X, pinky2Y, 'pinky');	
		blinky3.create(blinky3X, blinky3Y, 'blinky');
		clyde3.create(clyde3X, clyde3Y, 'clyde');
		inkey3.create(inkey3X, inkey3Y, 'inkey');
		pinky3.create(pinky3X, pinky3Y, 'pinky');
		blinky4.create(blinky4X, blinky4Y, 'blinky');
		clyde4.create(clyde4X, clyde4Y, 'clyde');
		inkey4.create(inkey4X, inkey4Y, 'inkey');
		pinky4.create(pinky4X, pinky4Y, 'pinky');
	}
};
