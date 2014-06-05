Game = function () {
	var map = null;
	var ohhMan = null;
	var blinky = null;
	var clyde = null;
	var inkey = null;
	var pinky = null;
	var blinky2 = null;
	var clyde2 = null;
	var inkey2 = null;
	var pinky2 = null;
	var blinky3 = null;
	var clyde3 = null;
	var inkey3 = null;
	var pinky3 = null;
	var blinky4 = null;
	var clyde4 = null;
	var inkey4 = null;
	var pinky4 = null;
	var life = null;
	var score = null;
};

Game.prototype = {
	preload : function() {
		this.loadMap();
		this.loadOhhman();
		this.loadGhosts();	
		this.loadLives();
		this.loadScore();
	},

	create : function() {			
		map.create();
		life.create();
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
		score.create();				
	},
	
	update : function() {				
		ohhMan.update();
		blinky.update();
		clyde.update();
		inkey.update();
		pinky.update();		
		blinky2.update();
		clyde2.update();
		inkey2.update();
		pinky2.update();	
		blinky3.update();
		clyde3.update();
		inkey3.update();
		pinky3.update();	
		blinky4.update();
		clyde4.update();
		inkey4.update();
		pinky4.update();	
	},
	
	render : function() {
		//blinky.render();
		//ohhMan.render();
	},
	
	loadMap : function() {
		map = new Map1();
		map.preload();
	},

	loadOhhman : function() {
		ohhMan = new Ohhman();
		ohhMan.preload();
	},
	
	loadGhosts : function() {
		blinky = new Blinky();
		blinky.preload();
		
		clyde = new Clyde();
		clyde.preload();
		
		inkey = new Inkey();
		inkey.preload();
		
		pinky = new Pinky();
		pinky.preload();
		
		blinky2 = new Blinky();
		blinky2.preload();
		
		clyde2 = new Clyde();
		clyde2.preload();
		
		inkey2 = new Inkey();
		inkey2.preload();
		
		pinky2 = new Pinky();
		pinky2.preload();
		
		blinky3 = new Blinky();
		blinky2.preload();
		
		clyde3 = new Clyde();
		clyde3.preload();
		
		inkey3 = new Inkey();
		inkey3.preload();
		
		pinky3 = new Pinky();
		pinky3.preload();
		
		blinky4 = new Blinky();
		blinky4.preload();
		
		clyde4 = new Clyde();
		clyde4.preload();
		
		inkey4 = new Inkey();
		inkey4.preload();
		
		pinky4 = new Pinky();
		pinky4.preload();
	},
	
	loadLives : function () {
		life = new Life();
		life.preload();
	},
	
	loadScore : function() {
		score = new Score();		
	}
};
