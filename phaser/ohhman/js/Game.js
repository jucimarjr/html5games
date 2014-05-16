Game = function () {
	var map = null;
	var ohhMan = null;
	var blinky = null;
	var clyde = null;
	var inkey = null;
	var pinky = null;
	var lives = null;
};

Game.prototype = {
	preload : function() {
		this.loadMap();
		this.loadOhhman();
		this.loadGhosts();	
		this.loadLives();
	},

	create : function() {			
		map.create();
		lives.create();
		ohhMan.create();
		blinky.create();
		clyde.create();
		inkey.create();
		pinky.create();			
	},
	
	update : function() {				
		ohhMan.update();
		blinky.update();
		clyde.update();
		inkey.update();
		pinky.update();		
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
	},
	
	loadLives : function () {
		lives = new Life();
		lives.preload();
	}
};
