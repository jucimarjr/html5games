var Ninja = {};

Ninja = function() {
};


Ninja.prototype.preload = function() {

    game.load.image('tiles', 'assets/tileset_fase_1.png');
    game.load.image('tiles2', 'assets/tileset_fase_1 - Retrovertido.png');
    game.load.image('nave', 'assets/phaser-ship.png');
    game.load.tilemap('map', 'assets/mapateste.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('sky', 'assets/sky2.png');


};

var sprite1;
var cursors;
var map;
var layer;
var tiles;
var layerColisao;

Ninja.prototype.create = function() {

    var sky = game.add.image(0, 0, 'sky');
    sky.fixedToCamera = true;

    //  Activate the Ninja physics system
    game.physics.startSystem(Phaser.Physics.NINJA);

    map = game.add.tilemap('map');
    map.addTilesetImage('tiles');
    //  map.addTilesetImage('tiles2');
    layer = map.createLayer('Camada de Tiles 1');
    // layerColisao = map.createLayer('Camada de Colisao');

    layer.resizeWorld();
    //  layerColisao.resizeWorld();

    var slopeMap = {'5':2 ,'54':2 };

    tiles = game.physics.ninja.convertTilemap(map, layer, slopeMap);

    sprite1 = game.add.sprite(50, 50, 'nave');

    game.physics.ninja.enableCircle(sprite1, sprite1.width / 2);

    //  A little more bounce
    sprite1.body.bounce = 0.5;

    game.camera.follow(sprite1);

    cursors = game.input.keyboard.createCursorKeys();

};

Ninja.prototype.update = function() {

    for (var i = 0; i < tiles.length; i++)
    {
        sprite1.body.circle.collideCircleVsTile(tiles[i].tile);

    }

    if (cursors.left.isDown)
    {
        sprite1.body.moveLeft(20);
    }
    else if (cursors.right.isDown)
    {
        sprite1.body.moveRight(20);
    }

    if (cursors.up.isDown)
    {
        sprite1.body.moveUp(20);
    }
    else if (cursors.down.isDown)
    {
        sprite1.body.moveUp(20);
    }

};