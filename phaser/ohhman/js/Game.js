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
		map1.create();
		ohhMan.create();
		blinky.create();
		clyde.create();
		inkey.create();
		pinky.create();
	},
	
	update : function() {
		var layer = map1.layer;
		var layer2 = map1.layer2;
		var decisionPoint = map1.decisionPoint;
		
		ohhMan.update(layer, layer2, decisionPoint, map1);
		blinky.update(layer);
		clyde.update(layer);
		inkey.update(layer);
		pinky.update(layer);
	},

	
	loadMap : function() {
		map1 = new Map1();
		map1.preload();
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
