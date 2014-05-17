var Mapa = {};

Mapa = function() {

    this.map;
    this.layer;
    this.layerColisao;
    this.player;
    this.tileset;
    this.tileset2;
    this.inimigosTipo1 = null;
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

var tiroInimigo1Timer = 0;
var tirosInimigo1;
var tiroInimigo1;
var livingEnemies = [];

var tirosInimigo2;
var tiroInimigo2;
var inimigos2 = [];

var scoreText;
var score;
var lives;
var liveText;
var playerVidas;
var texto;

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
    game.load.image('canhao', 'assets/canhaoplayer.png');
    game.load.image('espaco', 'assets/espaco.png');
    game.load.image('playerVidas', 'assets/playerVida.png');
    game.load.spritesheet('explosao', 'assets/explosao.png', 128, 128);
    game.load.spritesheet('animacaoPlayer', 'assets/Player45x33.png', 45, 33);
    game.load.spritesheet('sheetInimigoTipo2', 'assets/sheetInimigoTipo2_57X75.png', 50, 50);
    game.load.spritesheet('tiroInimigo', 'assets/sheetTiroInimigo1_17x16.png', 17, 16);
    game.load.spritesheet('tiroInimigo2', 'assets/sheetTiroInimigo2_47x81.png', 40, 50);
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
    this.inimigosTipo1 = game.add.group();
    this.inimigosTipo1.enableBody = true;
    this.inimigosTipo1.physicsBodyType = Phaser.Physics.ARCADE;
    this.map.createFromObjects('Camada de Objetos 1', 1249, 'inimigoTipo1', 0, true, true, this.inimigosTipo1);
    var tween = game.add.tween(this.inimigosTipo1).to({x: 200}, 2000, Phaser.Easing.Circular.Out, true, 1000, 100, true);
    var tween2 = game.add.tween(this.inimigosTipo1).to({y: 200}, 2000, Phaser.Easing.Exponential.Out, true, 1000, 100, true);

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
    tirosInimigo1 = game.add.group();
    tirosInimigo1.enableBody = true;
    tirosInimigo1.physicsBodyType = Phaser.Physics.ARCADE;
    tirosInimigo1.createMultiple(500, 'tiroInimigo');
    tirosInimigo1.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3], 10, true);
    tirosInimigo1.callAll('animations.play', 'animations', 'spin');

    // Tiro inimig2 
    tirosInimigo2 = game.add.group();
    tirosInimigo2.enableBody = true;
    tirosInimigo2.physicsBodyType = Phaser.Physics.ARCADE;
    tirosInimigo2.createMultiple(500, 'tiroInimigo2');
    tirosInimigo2.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 5, 6, 7], 10, true);
    tirosInimigo2.callAll('animations.play', 'animations', 'spin');

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

    //texto
    texto = game.add.text(game.world.centerX, game.world.centerY, ' ', {font: '84px Arial', fill: '#fff'});
    texto.anchor.setTo(0.5, 0.5);
    texto.visible = false;


    // inicializar explosoes
    explosoes = game.add.group();
    explosoes.createMultiple(100, 'explosao');
    explosoes.forEach(this.inicializarAnimacaoExplosao, this);

    // inicializar animacaoPlayer
//    animacaoPlayer = game.add.group();
//    animacaoPlayer.createMultiple(100, 'animacaoPlayer');
//    animacaoPlayer.forEach(this.inicializarAnimacaoPlayer, this);


    //  Vidas
    lives = 50;
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
    game.physics.arcade.overlap(this.tirosPlayer, this.inimigosTipo1, this.colisaoBytirosPlayerByinimigosTipo1, null, this);
    // game.physics.ninja.collide(this.player, this.layerColisao);
    game.physics.arcade.collide(this.player, this.layerColisao, this.testeColisao, null, this);
    game.physics.arcade.overlap(this.player, this.inimigosTipo1, this.colisaoByNaveByInimigo, null, this);
    game.physics.arcade.overlap(this.tirosPlayer, this.inimigosTipo1, this.colisaoBytirosPlayerByinimigo, null, this);
    game.physics.arcade.overlap(this.tirosPlayer, inimigoTipo2, this.colisaoBytirosPlayerByinimigo, null, this);
    game.physics.arcade.overlap(this.player, inimigoTipo2, this.colisaoByNaveByInimigo, null, this);
    game.physics.arcade.overlap(tirosInimigo1, this.player, this.colisaoByTiroInimigoByPlayer, null, this);
    game.physics.arcade.overlap(canhao, this.inimigosTipo1, this.colisaoBytirosPlayerByinimigo, null, this);
    game.physics.arcade.overlap(canhao, inimigoTipo2, this.colisaoBytirosPlayerByinimigo, null, this);
    game.physics.arcade.overlap(tirosInimigo2, this.player, this.colisaoByTiroInimigoByPlayer, null, this);
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

    if (game.time.now > tiroInimigo1Timer && lives > 0)
    {
        this.tirosInimigo1();
        this.tirosInimigo2();
    }

};

Mapa.prototype.tirosInimigo1 = function() {

    //pega o tiro do inimigo1 que já foi criado se ainda existir
    tiroInimigo1 = tirosInimigo1.getFirstExists(false);

    //array do inimigo1
    livingEnemies.length = 0;

    this.inimigosTipo1.forEach(function(inimigoTipo1) {

        // carrega na lista  todos os inimigos do tipo 1 
        livingEnemies.push(inimigoTipo1);

    });

    if (tiroInimigo1 && livingEnemies.length > 0)
    {
        var random = game.rnd.integerInRange(0, livingEnemies.length - 1);

        // randomly select one of them
        var shooter = livingEnemies[random];
        // And fire the bullet from this enemy
        if (((this.player.x - shooter.body.x < 300 && this.player.x - shooter.body.x > 0) && ((this.player.y - shooter.body.y < 300 && this.player.y - shooter.body.y > 0) || (shooter.body.y - this.player.y < 300 && shooter.body.y - this.player.y > 0))) || ((shooter.body.x - this.player.x < 300 && shooter.body.x - this.player.x > 0) && ((this.player.y - shooter.body.y < 300 && this.player.y - shooter.body.y > 0) || (shooter.body.y - this.player.y < 300 && shooter.body.y - this.player.y > 0)))) {
            tiroInimigo1.reset(shooter.body.x, shooter.body.y);

            game.physics.arcade.moveToObject(tiroInimigo1, this.player, 220);
            tiroInimigo1Timer = game.time.now + 30;
        }
    }
};

Mapa.prototype.tirosInimigo2 = function() {

    //pega o tiro do inimigo1 que já foi criado se ainda existir
    tiroInimigo2 = tirosInimigo2.getFirstExists(false);

    //array do inimigo1
    livingEnemies.length = 0;

    inimigoTipo2.forEach(function(inimigoTipo2) {

        // carrega na lista  todos os inimigos do tipo 1 
        livingEnemies.push(inimigoTipo2);

    });

    if (tiroInimigo2 && livingEnemies.length > 0)
    {
        var random = game.rnd.integerInRange(0, livingEnemies.length - 1);

        // randomly select one of them
        var shooter = livingEnemies[random];
        // And fire the bullet from this enemy
        if (((this.player.x - shooter.body.x < 300 && this.player.x - shooter.body.x > 0) && ((this.player.y - shooter.body.y < 300 && this.player.y - shooter.body.y > 0) || (shooter.body.y - this.player.y < 300 && shooter.body.y - this.player.y > 0))) || ((shooter.body.x - this.player.x < 300 && shooter.body.x - this.player.x > 0) && ((this.player.y - shooter.body.y < 300 && this.player.y - shooter.body.y > 0) || (shooter.body.y - this.player.y < 300 && shooter.body.y - this.player.y > 0)))) {
            tiroInimigo2.reset(shooter.body.x, shooter.body.y);

            game.physics.arcade.moveToObject(tiroInimigo2, this.player, 220);
            tiroInimigo1Timer = game.time.now + 100;
        }
    }
};



Mapa.prototype.colisaoByTiroInimigoByPlayer = function(player, tiroInimigo) {
    tiroInimigo.kill();
    // cria as explosao :)
    var explosion = explosoes.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('explosao', 30, false, true);

    //decrementa uma vida
    this.controleVidas();

    if (lives < 1)
    {
        player.kill();
//        this.posicionaTextoCentroCamera();
//        texto.text = " GAME OVER \n Click to restart";
//        texto.visible = true;
//        game.input.onTap.addOnce(restart, this);
    }
};

Mapa.prototype.criar = function() {
    var pessoa = this.inimigosTipo1.create(30, game.world.height - 300, 'inimigoTipo1');
    game.physics.enable(pessoa, Phaser.Physics.ARCADE);
    pessoa.body.velocity.x = -Math.random() * 10;
    pessoa.body.velocity.y = -Math.random() * 10;
    pessoa.body.collideWorldBounds = true;
    pessoa.body.bounce.set(1);
};

Mapa.prototype.posicionaTextoCentroCamera = function() {
    texto.x = game.camera.x + 400;
    texto.y = game.camera.y - 200;
}

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
    inimigo.destroy();

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
//        this.posicionaTextoCentroCamera();
//        texto.text = " GAME OVER \n Click to restart";
//        texto.visible = true;
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

        // procurar se ainda existe tiro inimigo 
        tiro = this.tirosPlayer.getFirstExists(false);

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
    inimigoTipo1.destroy();
    // cria as explosao :)
    var explosion = explosoes.getFirstExists(false);
    explosion.reset(inimigoTipo1.body.x, inimigoTipo1.body.y);
    explosion.play('explosao', 30, false, true);
    //pontuacao
    this.pontuacao(20);
};

Mapa.prototype.colisaoBytirosPlayerByinimigo = function(tiro, inimigo) {
    tiro.kill();
    inimigo.destroy();
    // cria as explosao :)
    var explosion = explosoes.getFirstExists(false);
    explosion.reset(inimigo.body.x, inimigo.body.y);
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

