var Game = {};

Game = function (game) {
	this.game = game;
};

Game.prototype.preload = function(){
	game.load.tilemap('background', 'assets/tilemaps/maps/background.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tile', 'assets/tilemaps/tiles/map.png');

};

Game.prototype.create = function(){
	this.loadMap();
	this.loadOhhman();
};

Game.prototype.loadMap = function () {
	var map = game.add.tilemap('background');	
	map.addTilesetImage('map', 'tile');	
	layer = map.createLayer('Camada de Tiles');		
	layer.resizeWorld();
};

Game.prototype.loadOhhman = function () {
	ohhman = new Ohhman();
	ohhman.create();
};