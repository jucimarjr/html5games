var Mapa = {};

Mapa = function() {

    this.map;
    this.layer;
    this.layer2;
    this.player;
    this.tileset;
    this.tileset2;
};


var facing = "left";
var cursors;
var hozMove = 600;
var vertMove = -600;
var cursors;
Mapa.prototype.preload = function() {

    game.load.image('tiles', 'assets/tileset_fase_1.png', 22, 32);
    game.load.image('tiles2', 'assets/tileset_fase_1 - Copia.png', 22, 32);
    game.load.image('nave', 'assets/phaser-ship.png');
    game.load.tilemap('map', 'assets/TilesetFase1.json', null, Phaser.Tilemap.TILED_JSON);
};

Mapa.prototype.create = function() {
    // Make the background color of the game's stage be white (#FFFFFF)
    //  game.stage.backgroundColor = '#FFB90F';
    game.world.setBounds(0, 0, 1400, 1400);

    this.map = game.add.tilemap('map');
    this.tileset = this.map.addTilesetImage('TilesetFase1-1', 'tiles');
    this.tileset2 = this.map.addTilesetImage('TilesetFase1-2', 'tiles2');
  this.layer = this.map.createLayer('Camada de Tiles 1');
    this.layer2 = this.map.createLayer('Camada de Colisao');
    this.layer.resizeWorld();
  //  this.map.setCollision(302);
    this.map.setCollision([302,301,159,290,278,156,12,11,35,181],true,'Camada de Colisao');
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
    game.physics.arcade.collide(this.player, this.layer2, this.testeColisao, null, this);
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

