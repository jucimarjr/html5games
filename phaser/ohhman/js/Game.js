Game = function () {
	var map = null;
	var ohhMan = null;
	var blinky = null;
	var clyde = null;
	var inkey = null;
	var pinky = null;
};

Game.prototype = {
	preload : function() {
		this.loadMap();
		this.loadOhhman();
		this.loadGhosts();
	},

	create : function() {			
		map.create();
		ohhMan.create();
		blinky.create();
		clyde.create();
		inkey.create();
		pinky.create();			
	},
	
	update : function() {
		var layer = map.layer;		
		
		ohhMan.update();
		blinky.update();
		clyde.update(layer);
		inkey.update(layer);
		pinky.update(layer);		
	},
	
	render : function() {
		blinky.render();
		ohhMan.render();
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
	}	
};
