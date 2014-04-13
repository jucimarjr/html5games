Game = function () {
	var map = null;
	var ohhMan = null;
	var blinky = null;
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
	},
	
	update : function() {
		ohhMan.update();
		blinky.update();
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
	}
};
