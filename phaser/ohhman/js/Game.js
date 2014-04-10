var Game = {};

Game = function (game) {
	this.game = game;
};

Game.prototype.preload = function(){
	game.load.tilemap('map1', 'assets/tilemaps/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tile1', 'assets/tilemaps/tiles/tile1.png');
    this.loadOhhman();
};

Game.prototype.create = function(){
	this.loadMap();
	ohhman.create();
};

Game.prototype.loadMap = function () {
	var map = game.add.tilemap('map1');	
	map.addTilesetImage('tile1', 'tile1');	
	layer = map.createLayer('Camada de Tiles');		
	layer.resizeWorld();
};

Game.prototype.loadOhhman = function () {
	ohhman = new Ohhman();
	ohhman.preload();
};