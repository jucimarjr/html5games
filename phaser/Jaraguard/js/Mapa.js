var Mapa = {};

Mapa = function() {

    this.map;
    this.layer;
    this.layerColisao;
    this.player;
    this.tileset;
    this.tileset2;
    this.inimigoTipo1 = null;
    this.tirosPlayer;
};


var tiroTime = 0;
var buttonSpaceBar;
var canhao;
var canhaoTime = 0;
var buttonEnter;

var cursors;
var hozMove = 300;
var vertMove = -300;
var cursors;
Mapa.prototype.preload = function() {

    game.load.image('tiles', 'assets/tileset_fase_1.png', 22, 32);
    game.load.image('tiles2', 'assets/tileset_fase_1 - Retrovertido.png', 22, 32);
    game.load.image('nave', 'assets/phaser-ship.png');
    game.load.tilemap('map', 'assets/mapa_fase_01.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('inimigoTipo1', 'assets/invader.png');
    game.load.image('bullet', 'assets/tiroplayer.png');
    game.load.image('canhao', 'assets/canhaoplayer.png');
};

Mapa.prototype.create = function() {

    //  game.physics.startSystem(Phaser.Physics.NINJA);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  game.stage.backgroundColor = '#FFB90F';
    game.world.setBounds(0, 0, 2400, 2400);
    this.map = game.add.tilemap('map');

    this.tileset = this.map.addTilesetImage('tileset_fase_1', 'tiles');
    this.tileset2 = this.map.addTilesetImage('tileset_fase_1 - Retrovertido', 'tiles2');

    this.layer = this.map.createLayer('Camada de Tiles 1');
    this.layerColisao = this.map.createLayer('Camada de Colisao');

    this.layer.resizeWorld();

    this.map.setCollision([12, 21, 22, 46, 110, 118, 141, 360, 1108, 1131, 1237, 1228, 1203], true, 'Camada de Colisao');

    //inimigo
    this.inimigoTipo1 = game.add.group();
    this.inimigoTipo1.enableBody = true;
    this.inimigoTipo1.physicsBodyType = Phaser.Physics.ARCADE;
    this.map.createFromObjects('Camada de Objetos 1', 1249, 'inimigoTipo1', 0, true, false, this.inimigoTipo1);

    //jogador = nave
    this.player = game.add.sprite(0, game.world.height - 300, 'nave');
    this.player.anchor.setTo(0.5, 0.5);
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    game.camera.follow(this.player);

    //  Balas da nossa nave
    this.tirosPlayer = game.add.group();
    this.tirosPlayer.enableBody = true;
    this.tirosPlayer.physicsBodyType = Phaser.Physics.ARCADE;
    this.tirosPlayer.createMultiple(500, 'bullet');
    this.tirosPlayer.setAll('anchor.x', 0.5);
    this.tirosPlayer.setAll('anchor.y', 1);
    this.tirosPlayer.setAll('outOfBoundsKill', true);

    //  canhao da nossa nave
    canhao = game.add.group();
    canhao.enableBody = true;
    canhao.physicsBodyType = Phaser.Physics.ARCADE;
    canhao.createMultiple(100, 'canhao');
    canhao.setAll('anchor.x', 0.5);
    canhao.setAll('anchor.y', 1);
    canhao.setAll('outOfBoundsKill', true);


    cursors = game.input.keyboard.createCursorKeys();
    buttonSpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    buttonEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

};

Mapa.prototype.update = function() {

    game.angle += 0.1;
    //inicializa velocidade
    this.player.body.velocity.setTo(0, 0);
    //colisoes

    game.physics.arcade.overlap(this.tirosPlayer, this.inimigoTipo1, this.colisaoBytirosPlayerByinimigoTipo1, null, this);
    // game.physics.ninja.collide(this.player, this.layerColisao);
    game.physics.arcade.collide(this.player, this.layerColisao, this.testeColisao, null, this);
    game.physics.arcade.overlap(this.player, this.inimigoTipo1, this.colisaoByNaveByInimigo, null, this);
    //  game.camera.x += 1;
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

    if (buttonSpaceBar.isDown && !buttonEnter.isDown)
    {
        this.tiroNormal();
    } else if (buttonSpaceBar.isDown && buttonEnter.isDown) {
        this.tiroCanhao();
    }

};
Mapa.prototype.testeColisao = function() {
    console.log("pos colisao");
};
Mapa.prototype.colisaoByNaveByInimigo = function(player, inimigo) {

    inimigo.kill();

};
Mapa.prototype.tiroCanhao = function() {
//funcao atirar 
    if (game.time.now > canhaoTime)
        canhoes = canhao.getFirstExists(false);
    if (canhoes) {

        canhoes.reset(this.player.x, this.player.y - 8);
        canhoes.body.velocity.x = +600;
        canhaoTime = game.time.now + 200;
    }
};

Mapa.prototype.tiroNormal = function() {
    if (game.time.now > tiroTime)
    {
        //  Grab the first bullet we can from the pool
        tiro = this.tirosPlayer.getFirstExists(false);

        if (tiro)
        {
            //  And fire it
            tiro.reset(this.player.x, this.player.y + 8);
            tiro.body.velocity.x = +400;
            tiroTime = game.time.now + 200;
        }
    }

};

Mapa.prototype.colisaoBytirosPlayerByinimigoTipo1 = function(tiro, inimigoTipo1) {
    tiro.kill();
    inimigoTipo1.kill();

};