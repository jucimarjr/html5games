var Mapa = {};

Mapa = function() {

    this.map;
    this.layer;
    this.player;
};

var tileset;
var facing = "left";
var cursors;
var hozMove = 600;
var vertMove = -600;
var cursors;
Mapa.prototype.preload = function() {

    game.load.image('tiles', 'assets/tileset_fase_1.png', 22, 32);
    game.load.image('nave', 'assets/phaser-ship.png');
    game.load.tilemap('map', 'assets/mapa_fase_01.json', null, Phaser.Tilemap.TILED_JSON);
};

Mapa.prototype.create = function() {
    // Make the background color of the game's stage be white (#FFFFFF)
    //  game.stage.backgroundColor = '#FFB90F';
    game.world.setBounds(0, 0, 1400, 1400);

    this.map = game.add.tilemap('map');
    this.tileset = this.map.addTilesetImage('camada_fase01', 'tiles');
    this.layer = this.map.createLayer('Camada de Tiles 1');
    this.layer.resizeWorld();
    this.map.setCollision(108);
    this.player = game.add.sprite(0, game.world.height/2, 'nave');


    game.physics.enable(this.player);
    this.player.body.bounce.y = 0.1;
    this.player.body.linearDamping = 1;
    this.player.body.collideWorldBounds = true;
    //game.camera.follow(this.player);
    cursors = game.input.keyboard.createCursorKeys();


};

Mapa.prototype.update = function() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.angle += 1;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    game.physics.arcade.collide(this.player, this.layer, this.testeColisao, null, this);
    game.camera.x += 1;
    if (cursors.left.isDown)
    {
        this.player.body.velocity.x = -hozMove;
        // game.camera.x -= 3;
    }

    else if (cursors.right.isDown)
    {
        this.player.body.velocity.x = hozMove;
        //  game.camera.x += 3;

    }
    if (cursors.up.isDown) {
        this.player.body.velocity.y = -hozMove;
        // game.camera.y += 3;
        //game.angle += 1;

    } else if (cursors.down.isDown) {
        this.player.body.velocity.y = hozMove;
        //  game.camera.y -= 3;
    }

};
Mapa.prototype.testeColisao = function() {
    console.log("pos colisao");
};

