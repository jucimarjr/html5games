var Mapa = {};

Mapa = function() {


};
var map;
var layer;
var layerColisao;
var tileset;
var tileset2;

Mapa.prototype.preload = function() {

    game.load.image('tiles', 'assets/tileset_fase_1.png', 22, 32);
    game.load.image('tiles2', 'assets/tileset_fase_1 - Retrovertido.png', 22, 32);
    game.load.tilemap('map', 'assets/mapa_fase_01.json', null, Phaser.Tilemap.TILED_JSON);
};

Mapa.prototype.create = function() {
    //caracteristicas do mapa
    map = game.add.tilemap('map');
    tileset = map.addTilesetImage('tileset_fase_1', 'tiles');
    tileset2 = map.addTilesetImage('tileset_fase_1 - Retrovertido', 'tiles2');
    layer = map.createLayer('Camada de Tiles 1');
    layerColisao = map.createLayer('Camada de Colisao');
    layer.resizeWorld();
    map.setCollision([12, 21, 22, 46, 110, 118, 141, 360, 1108, 1131, 1237, 1228, 1203], true, 'Camada de Colisao');
};

Mapa.prototype.getLayerColisao = function() {
    return layerColisao;
};

Mapa.prototype.getMap = function() {
    return map;
};

Mapa.prototype.paralax = function() {
    console.log("x=" + game.camera.x + " y=" + game.camera.y);
    if (game.camera.x < 2570) {
        game.camera.x += 5;
    }
    if (game.camera.x === 2570 && game.camera.y > 1) {
        game.camera.y -= 5;
    }

    if (game.camera.y === 0 && game.camera.x < 4400) {
        game.camera.x += 5;
    }

    if (game.camera.x === 4400 && game.camera.y < 2200) {
        game.camera.y += 5;
    }
    if (game.camera.y === 2200 && game.camera.x >= 4400) {
        game.camera.x += 5;
    }


}
;

Mapa.prototype.incializaCamera = function() {
    game.camera.x = 30;
    game.camera.y = game.world.height - 100;

};