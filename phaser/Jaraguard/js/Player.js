var Player = {};
Player = function() {

};
var tirosPlayer;
var player;
var canhao;
var animacaoPlayer;
var canhaoTime = 0;
var tiroTime = 0;
var tiro;
var hozMove = 300;
var vertMove = -300;
Player.prototype.preload = function() {
    game.load.image('nave', 'assets/player.png');
    game.load.image('tiroplayer', 'assets/tiroplayer.png');
    game.load.image('canhao', 'assets/canhaoplayer.png');
    game.load.spritesheet('animacaoPlayer', 'assets/Player45x33.png', 45, 33);

};
Player.prototype.create = function() {
    //jogador = nave
    player = game.add.sprite(30, game.world.height - 300, 'nave');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.camera.follow(player);

    //  tiros de nossa nave
    tirosPlayer = game.add.group();
    tirosPlayer.enableBody = true;
    tirosPlayer.physicsBodyType = Phaser.Physics.ARCADE;
    tirosPlayer.createMultiple(500, 'tiroplayer');
    tirosPlayer.setAll('anchor.x', 0.5);
    tirosPlayer.setAll('anchor.y', 1);
    tirosPlayer.setAll('outOfBoundsKill', true);

    //  canhao da nossa nave
    canhao = game.add.group();
    canhao.enableBody = true;
    canhao.physicsBodyType = Phaser.Physics.ARCADE;
    canhao.createMultiple(100, 'canhao');
    canhao.setAll('anchor.x', 0.5);
    canhao.setAll('anchor.y', 1);
    canhao.setAll('outOfBoundsKill', true);

    // inicializar animacaoPlayer
//    animacaoPlayer = game.add.group();
//    animacaoPlayer.createMultiple(100, 'animacaoPlayer');
//    animacaoPlayer.forEach(this.inicializarAnimacaoPlayer, this);
};

Player.prototype.update = function() {
    //inicializa velocidade
    player.body.velocity.setTo(0, 0);

};

Player.prototype.getPlayer = function() {
    return player;
};

Player.prototype.getTirosPlayer = function() {
    return tirosPlayer;
};
Player.prototype.getCanhao = function() {
    return canhao;
};


Player.prototype.moverParaEsquerda = function() {
    player.body.velocity.x = -hozMove;
};

Player.prototype.moverParaDireita = function() {
    player.body.velocity.x = hozMove;
};

Player.prototype.moverParaCima = function() {
    player.body.velocity.y = -hozMove;
};

Player.prototype.moverParaBaixo = function() {
    player.body.velocity.y = hozMove;
};

Player.prototype.inicializarAnimacaoPlayer = function(objetoAux) {

    objetoAux.anchor.x = 0.5;
    objetoAux.anchor.y = 0.5;
    objetoAux.animations.add('animacaoPlayer');
};

Player.prototype.tiroCanhao = function() {
//funcao atirar 
    if (game.time.now > canhaoTime && lifeScene.getVida() > 0)
        canhoes = canhao.getFirstExists(false);
    if (canhoes) {

        canhoes.reset(player.x, player.y - 8);
        canhoes.body.velocity.x = +600;
        canhaoTime = game.time.now + 200;
    }
};

Player.prototype.tiroNormal = function() {

    if (game.time.now > tiroTime && lifeScene.getVida() > 0)
    {

        // procurar se ainda existe tiro inimigo 
        tiro = tirosPlayer.getFirstExists(false);

        if (tiro)
        {  //executar animacao
//            animacaoplay.reset(this.player.body.x + 25, this.player.body.y + 15);
//            animacaoplay.play('animacaoPlayer', 125, false, true);
            //  And fire it
            tiro.reset(player.x + 12, player.y + 8);
            tiro.body.velocity.x = +400;
            tiroTime = game.time.now + 200;


        }
    }
};

Player.prototype.controlaExistenciaTirosPlayer = function() {
    if (tiro) {
        if (tiro.x - player.x > 790) {
            tiro.kill();
        }
    }
};
