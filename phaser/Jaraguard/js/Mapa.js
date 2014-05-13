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
var inimigoTipo2;


var cursors;
var hozMove = 300;
var vertMove = -300;
var cursors;


var scoreText;
var score;
var lives;
var liveText;
var playerVidas;
var tiroInimigo;
var explosoes;
var animacaoPlayer;
var espaco;
var tiro;
Mapa.prototype.preload = function() {

    game.load.image('tiles', 'assets/tileset_fase_1.png', 22, 32);
    game.load.image('tiles2', 'assets/tileset_fase_1 - Retrovertido.png', 22, 32);
    game.load.image('nave', 'assets/player.png');
    game.load.tilemap('map', 'assets/mapa_fase_01.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('inimigoTipo1', 'assets/invader.png');
    game.load.image('tiroplayer', 'assets/tiroplayer.png');
    game.load.image('tiroInimigo', 'assets/tiroInimigo.png');
    game.load.image('canhao', 'assets/canhaoplayer.png');
    game.load.image('espaco', 'assets/espaco.png');
    game.load.image('playerVidas', 'assets/playerVida.png');
    game.load.spritesheet('explosao', 'assets/explosao.png', 128, 128);
    game.load.spritesheet('animacaoPlayer', 'assets/Player45x33.png', 45, 33);
    game.load.spritesheet('sheetInimigoTipo2', 'assets/sheetInimigoTipo2_57X75.png', 50, 50);
};

Mapa.prototype.create = function() {

    //  game.physics.startSystem(Phaser.Physics.NINJA);
    espaco = game.add.image(0, 0, 'espaco');
    espaco.fixedToCamera = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  game.stage.backgroundColor = '#FFB90F';
    game.world.setBounds(0, 0, 2400, 2400);
    //caracteristicas do mapa
    this.map = game.add.tilemap('map');
    this.tileset = this.map.addTilesetImage('tileset_fase_1', 'tiles');
    this.tileset2 = this.map.addTilesetImage('tileset_fase_1 - Retrovertido', 'tiles2');
    this.layer = this.map.createLayer('Camada de Tiles 1');
    this.layerColisao = this.map.createLayer('Camada de Colisao');
    this.layer.resizeWorld();
    this.map.setCollision([12, 21, 22, 46, 110, 118, 141, 360, 1108, 1131, 1237, 1228, 1203], true, 'Camada de Colisao');

    //inimigo tipo 1
    this.inimigoTipo1 = game.add.group();
    this.inimigoTipo1.enableBody = true;
    this.inimigoTipo1.physicsBodyType = Phaser.Physics.ARCADE;
    this.map.createFromObjects('Camada de Objetos 1', 1249, 'inimigoTipo1', 0, true, true, this.inimigoTipo1);
    var tween = game.add.tween(this.inimigoTipo1).to({x: 200}, 2000, Phaser.Easing.Circular.Out, true, 1000, 100, true);
    var tween2 = game.add.tween(this.inimigoTipo1).to({y: 200}, 2000, Phaser.Easing.Exponential.Out, true, 1000, 100, true);

    //inimigo tipo 2
    inimigoTipo2 = game.add.group();
    inimigoTipo2.enableBody = true;
    // inimigoTipo2.physicsBodyType = Phaser.Physics.ARCADE;
    this.map.createFromObjects('Camada de Objetos 1', 1250, 'sheetInimigoTipo2', 0, true, true, inimigoTipo2);
//  Add animations to all of the coin sprites
    inimigoTipo2.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3], 10, true);
    inimigoTipo2.callAll('animations.play', 'animations', 'spin');
    var tween = game.add.tween(inimigoTipo2).to({x: 100}, 1000, Phaser.Easing.Linear.Out, true, 10, 100, true);

    //jogador = nave
    this.player = game.add.sprite(30, game.world.height - 300, 'nave');
    this.player.anchor.setTo(0.5, 0.5);
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    game.camera.follow(this.player);

    //  Balas da nossa nave
    this.tirosPlayer = game.add.group();
    this.tirosPlayer.enableBody = true;
    this.tirosPlayer.physicsBodyType = Phaser.Physics.ARCADE;
    this.tirosPlayer.createMultiple(500, 'tiroplayer');
    this.tirosPlayer.setAll('anchor.x', 0.5);
    this.tirosPlayer.setAll('anchor.y', 1);
    this.tirosPlayer.setAll('outOfBoundsKill', true);

    // Tiro inimigo 
    tiroInimigo = game.add.group();
    tiroInimigo.enableBody = true;
    tiroInimigo.physicsBodyType = Phaser.Physics.ARCADE;
    tiroInimigo.createMultiple(30, 'tiroInimigo');
    tiroInimigo.setAll('anchor.x', 0.5);
    tiroInimigo.setAll('anchor.y', 1);
    tiroInimigo.setAll('outOfBoundsKill', true);
    tiroInimigo.setAll('checkWorldBounds', true);
    //  canhao da nossa nave
    canhao = game.add.group();
    canhao.enableBody = true;
    canhao.physicsBodyType = Phaser.Physics.ARCADE;
    canhao.createMultiple(100, 'canhao');
    canhao.setAll('anchor.x', 0.5);
    canhao.setAll('anchor.y', 1);
    canhao.setAll('outOfBoundsKill', true);

    //  Pontuação
    score = 0;
    scoreText = game.add.text(30, game.world.centerY + 300, '' + score, {font: '34px Arial', fill: '#fff'});
    // scoreText.visible = true;

    // inicializar explosoes
    explosoes = game.add.group();
    explosoes.createMultiple(100, 'explosao');
    explosoes.forEach(this.inicializarAnimacaoExplosao, this);

    // inicializar animacaoPlayer
//    animacaoPlayer = game.add.group();
//    animacaoPlayer.createMultiple(100, 'animacaoPlayer');
//    animacaoPlayer.forEach(this.inicializarAnimacaoPlayer, this);


    //  Vidas
    lives = 2;
    liveText = game.add.text(30, game.world.centerY + 300, ' x ' + lives, {font: '34px Arial', fill: '#fff'});
    playerVidas = game.add.sprite(30, game.world.height - 300, 'playerVidas');
    playerVidas.angle = 0;
    playerVidas.alpha = 1;

//teste time
    // game.time.events.repeat(Phaser.Timer.SECOND * 5, 3, this.criar(), this)



    cursors = game.input.keyboard.createCursorKeys();
    buttonSpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    buttonEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

};

Mapa.prototype.update = function() {

    game.angle += 0.1;
    this.poscionaPontuacao();
    //inicializa velocidade
    this.player.body.velocity.setTo(0, 0);
    this.controlaTiros();

    //colisoes
    game.physics.arcade.overlap(this.tirosPlayer, this.inimigoTipo1, this.colisaoBytirosPlayerByinimigoTipo1, null, this);
    // game.physics.ninja.collide(this.player, this.layerColisao);
    game.physics.arcade.collide(this.player, this.layerColisao, this.testeColisao, null, this);
    game.physics.arcade.overlap(this.player, this.inimigoTipo1, this.colisaoByNaveByInimigo, null, this);
    game.physics.arcade.overlap(this.tirosPlayer, inimigoTipo2, this.colisaoBytirosPlayerByinimigoTipo2, null, this);
    game.physics.arcade.overlap(this.player, inimigoTipo2, this.colisaoByNaveByInimigo, null, this);

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
Mapa.prototype.criar = function() {
    var pessoa = this.inimigoTipo1.create(30, game.world.height - 300, 'inimigoTipo1');
    game.physics.enable(pessoa, Phaser.Physics.ARCADE);
    pessoa.body.velocity.x = -Math.random() * 10;
    pessoa.body.velocity.y = -Math.random() * 10;
    pessoa.body.collideWorldBounds = true;
    pessoa.body.bounce.set(1);
};

Mapa.prototype.poscionaPontuacao = function() {
    //posicao do score seguindo a camera
    scoreText.x = game.camera.x + 120;
    scoreText.y = game.camera.y + 6;
    //  posiciona imagem da nave 
    playerVidas.x = game.camera.x + 250;
    playerVidas.y = game.camera.y + 10;
    //posicao das vidas alinhado  ao score 
    liveText.x = game.camera.x + 280;
    liveText.y = game.camera.y + 6;

}
Mapa.prototype.testeColisao = function() {
    console.log("pos colisao");
};
Mapa.prototype.colisaoByNaveByInimigo = function(player, inimigo) {
    inimigo.kill();

// cria as explosao inimigo
    var explosion = explosoes.getFirstExists(false);
    explosion.reset(inimigo.body.x, inimigo.body.y);
    explosion.play('explosao', 30, false, true);

    // cria as explosao da nave
    var explosion2 = explosoes.getFirstExists(false);
    explosion2.reset(player.body.x, player.body.y);
    explosion2.play('explosao', 30, false, true);

    //decrementa uma vida
    this.controleVidas();

    if (lives < 1)
    {
        player.kill();
//    //    enemyBullets.callAll('kill');
//
//        stateText.text = " GAME OVER \n Click to restart";
//        stateText.visible = true;
//
//        //the "click to restart" handler
//        game.input.onTap.addOnce(restart, this);
    }


};

Mapa.prototype.controlaTiros = function() {
    if (tiro) {
        if (tiro.x - this.player.x > 790) {
            tiro.kill();
        }
    }
};

Mapa.prototype.tiroCanhao = function() {
//funcao atirar 
    if (game.time.now > canhaoTime && lives > 0)
        canhoes = canhao.getFirstExists(false);
    if (canhoes) {

        canhoes.reset(this.player.x, this.player.y - 8);
        canhoes.body.velocity.x = +600;
        canhaoTime = game.time.now + 200;
    }
};

Mapa.prototype.tiroNormal = function() {

    if (game.time.now > tiroTime && lives > 0)
    {

        //  Grab the first bullet we can from the pool
        tiro = this.tirosPlayer.getFirstExists(false);

        // cria  Animacao Player
//        var animacaoplay = animacaoPlayer.getFirstExists(false);


        if (tiro)
        {  //executar animacao
//            animacaoplay.reset(this.player.body.x + 25, this.player.body.y + 15);
//            animacaoplay.play('animacaoPlayer', 125, false, true);
            //  And fire it
            tiro.reset(this.player.x + 12, this.player.y + 8);
            tiro.body.velocity.x = +400;
            tiroTime = game.time.now + 200;


        }
    }


};

Mapa.prototype.colisaoBytirosPlayerByinimigoTipo1 = function(tiro, inimigoTipo1) {
    tiro.kill();
    inimigoTipo1.kill();
    // cria as explosao :)
    var explosion = explosoes.getFirstExists(false);
    explosion.reset(inimigoTipo1.body.x, inimigoTipo1.body.y);
    explosion.play('explosao', 30, false, true);
    //pontuacao
    this.pontuacao(20);
};

Mapa.prototype.colisaoBytirosPlayerByinimigoTipo2 = function(tiro, inimigoTipo2) {
    tiro.kill();
    inimigoTipo2.kill();
    // cria as explosao :)
    var explosion = explosoes.getFirstExists(false);
    explosion.reset(inimigoTipo2.body.x, inimigoTipo2.body.y);
    explosion.play('explosao', 30, false, true);
    //pontuacao
    this.pontuacao(20);
};

Mapa.prototype.inicializarAnimacaoExplosao = function(objetoAux) {

    objetoAux.anchor.x = 0.5;
    objetoAux.anchor.y = 0.5;
    objetoAux.animations.add('explosao');
};

Mapa.prototype.inicializarAnimacaoPlayer = function(objetoAux) {

    objetoAux.anchor.x = 0.5;
    objetoAux.anchor.y = 0.5;
    objetoAux.animations.add('animacaoPlayer');
};

Mapa.prototype.pontuacao = function(pontuacao) {
    score += pontuacao;
    scoreText.text = score;
};

Mapa.prototype.controleVidas = function() {
    lives -= 1;
    liveText.text = ' x ' + lives;
};

