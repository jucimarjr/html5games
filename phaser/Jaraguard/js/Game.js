var Game = {};
Game = function() {
    this.inimigosTipo1 = null;
};
var buttonSpaceBar;
var buttonEnter;
var inimigoTipo2;
var hozMove = 300;
var vertMove = -300;
var cursors;
var tiroInimigoTimer = 0;
var tirosInimigo1;
var tiroInimigo1;
var livingEnemies = [];
var tirosInimigo2;
var tiroInimigo2;
var inimigos2 = [];
var textoGameOver;
var explosoes;
var espaco;
Game.prototype.preload = function() {
    game.load.image('inimigoTipo1', 'assets/invader.png');
    game.load.image('espaco', 'assets/espaco.png');
    game.load.spritesheet('explosao', 'assets/explosao.png', 128, 128);
    game.load.spritesheet('sheetInimigoTipo2', 'assets/sheetInimigoTipo2_57X75.png', 50, 50);
    game.load.spritesheet('tiroInimigo', 'assets/sheetTiroInimigo1_17x16.png', 17, 16);
    game.load.spritesheet('tiroInimigo2', 'assets/sheetTiroInimigo2_47x81.png', 40, 50);
    game.load.spritesheet('sheetInimigoTipo3', 'assets/spritSheetMorcego32x22.png', 32, 22);
    mapaScene = new Mapa();
    mapaScene.preload();
    lifeScene = new Life();
    scoreScene = new Score();
    scoreScene.preload();
    playerScene = new Player();
    playerScene.preload();
};

Game.prototype.create = function() {
    //background do jogo
    espaco = game.add.image(0, 0, 'espaco');
    espaco.fixedToCamera = true;
    //inicializa fisica do jogo
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 1200, 1200);
    //mapa
    mapaScene.create();
    //life
    lifeScene.create();
    //player
    playerScene.create();
    //inimigo tipo 1
    this.inimigosTipo1 = game.add.group();
    this.inimigosTipo1.enableBody = true;
    this.inimigosTipo1.physicsBodyType = Phaser.Physics.ARCADE;
    mapaScene.getMap().createFromObjects('Camada de Objetos 1', 1249, 'inimigoTipo1', 0, true, true, this.inimigosTipo1);
    var tween = game.add.tween(this.inimigosTipo1).to({x: 200}, 2000, Phaser.Easing.Circular.Out, true, 1000, 100, true);
    var tween2 = game.add.tween(this.inimigosTipo1).to({y: 200}, 2000, Phaser.Easing.Exponential.Out, true, 1000, 100, true);

    //inimigo tipo 2
    inimigoTipo2 = game.add.group();
    inimigoTipo2.enableBody = true;
    // inimigoTipo2.physicsBodyType = Phaser.Physics.ARCADE;
    mapaScene.getMap().createFromObjects('Camada de Objetos 1', 1250, 'sheetInimigoTipo2', 0, true, true, inimigoTipo2);
//  Add animations to all of the coin sprites
    inimigoTipo2.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3], 10, true);
    inimigoTipo2.callAll('animations.play', 'animations', 'spin');
    var tween = game.add.tween(inimigoTipo2).to({x: 100}, 1000, Phaser.Easing.Linear.Out, true, 10, 100, true);

    //inimigo tipo 3
    inimigosTipo3 = game.add.group();
    inimigosTipo3.enableBody = true;
    inimigosTipo3.physicsBodyType = Phaser.Physics.ARCADE;
    mapaScene.getMap().createFromObjects('Camada de Objetos 1', 1251, 'sheetInimigoTipo3', 0, true, true, inimigosTipo3);
//  Add animations to all of the coin sprites
    inimigosTipo3.createMultiple(500, 'sheetInimigoTipo3');
    inimigosTipo3.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    inimigosTipo3.callAll('animations.play', 'animations', 'spin');
    var tween3 = game.add.tween(inimigosTipo3).to({x: 100}, 1000, Phaser.Easing.Linear.Out, true, 10, 100, true);


    // Tiro inimigo 
    tirosInimigo1 = game.add.group();
    tirosInimigo1.enableBody = true;
    tirosInimigo1.physicsBodyType = Phaser.Physics.ARCADE;
    tirosInimigo1.outOfBoundsKill = true;
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

    //  Pontuação
    scoreScene.create();

    //texto
    textoGameOver = game.add.text(game.world.centerX, game.world.centerY, ' ', {font: '84px Arial', fill: '#fff'});
    textoGameOver.anchor.setTo(0.5, 0.5);
    textoGameOver.visible = false;

    // inicializar explosoes
    explosoes = game.add.group();
    explosoes.createMultiple(100, 'explosao');
    explosoes.forEach(this.inicializarAnimacaoExplosao, this);

//teste time
    // game.time.events.repeat(Phaser.Timer.SECOND * 5, 3, this.criar(), this)

    cursors = game.input.keyboard.createCursorKeys();
    buttonSpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    buttonEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

};

Game.prototype.update = function() {

    game.angle += 0.1;
    //posiciona painel de pontuacao
  //  scoreScene.();
    //inicializa velocidade do player
    playerScene.update();
    //controle de tiros da nave

    //colisoes
    this.verificaColisoes();
    //verifica movimentos da nave e aplica sua açáo correspondente 
    this.verificaMovimentoPlayerByCursor();
    //verifa tecla pressionada correspondente ao tipo de tiro do player
    this.verificaTipoDeTiroAcionado();
    //controla quantidade de tiros do inimigo por segundos e verifica se a nave já foi destruída
    this.controlaTiroDoInimigoPorTempoPorLife();
    this.AcionaImigo3();
};

Game.prototype.controlaTiroDoInimigoPorTempoPorLife = function() {
    if (game.time.now > tiroInimigoTimer && lifeScene.getVida() > 0)
    {
        this.tirosInimigo1();
        this.tirosInimigo2();
    }
};

Game.prototype.verificaMovimentoPlayerByCursor = function() {
    if (cursors.left.isDown)
    {
        playerScene.moverParaEsquerda();
    }
    else if (cursors.right.isDown)
    {
        playerScene.moverParaDireita();
    }

    if (cursors.up.isDown)
    {
        playerScene.moverParaCima();

    }
    else if (cursors.down.isDown)
    {
        playerScene.moverParaBaixo();
    }

};

Game.prototype.verificaTipoDeTiroAcionado = function() {
    if (buttonSpaceBar.isDown && !buttonEnter.isDown)
    {
        playerScene.tiroNormal();
    }
    else if (buttonEnter.isDown)
    {
        playerScene.tiroCanhao();

    }
};

Game.prototype.verificaColisoes = function() {
    game.physics.arcade.overlap(playerScene.getTirosPlayer(), this.inimigosTipo1, this.colisaoBytirosPlayerByinimigosTipo1, null, this);
    game.physics.arcade.collide(playerScene.getPlayer(), mapaScene.getLayerColisao(), this.testeColisao, null, this);
    game.physics.arcade.overlap(playerScene.getPlayer(), this.inimigosTipo1, this.colisaoByNaveByInimigo, null, this);
    game.physics.arcade.overlap(playerScene.getTirosPlayer(), this.inimigosTipo1, this.colisaoBytirosPlayerByinimigo, null, this);
    game.physics.arcade.overlap(playerScene.getTirosPlayer(), inimigoTipo2, this.colisaoBytirosPlayerByinimigo, null, this);
    game.physics.arcade.overlap(playerScene.getPlayer(), inimigoTipo2, this.colisaoByNaveByInimigo, null, this);
    game.physics.arcade.overlap(tirosInimigo1, playerScene.getPlayer(), this.colisaoByTiroInimigoByPlayer, null, this);
    game.physics.arcade.overlap(playerScene.getCanhao(), this.inimigosTipo1, this.colisaoBytirosPlayerByinimigo, null, this);
    game.physics.arcade.overlap(playerScene.getCanhao(), inimigoTipo2, this.colisaoBytirosPlayerByinimigo, null, this);
    game.physics.arcade.overlap(tirosInimigo2, playerScene.getPlayer(), this.colisaoByTiroInimigoByPlayer, null, this);
    game.physics.arcade.overlap(inimigosTipo3, playerScene.getPlayer(), this.colisaoByTiroInimigoByPlayer, null, this);
};

Game.prototype.tirosInimigo1 = function() {

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
        if (((playerScene.getPlayer().x - shooter.body.x < 300 && playerScene.getPlayer().x - shooter.body.x > 0) && ((playerScene.getPlayer().y - shooter.body.y < 300 && playerScene.getPlayer().y - shooter.body.y > 0) || (shooter.body.y - playerScene.getPlayer().y < 300 && shooter.body.y - playerScene.getPlayer().y > 0))) || ((shooter.body.x - playerScene.getPlayer().x < 300 && shooter.body.x - playerScene.getPlayer().x > 0) && ((playerScene.getPlayer().y - shooter.body.y < 300 && playerScene.getPlayer().y - shooter.body.y > 0) || (shooter.body.y - playerScene.getPlayer().y < 300 && shooter.body.y - playerScene.getPlayer().y > 0)))) {
            tiroInimigo1.reset(shooter.body.x, shooter.body.y);

            game.physics.arcade.moveToObject(tiroInimigo1, playerScene.getPlayer(), 220);
            tiroInimigoTimer = game.time.now + 30;
        }
    }
};

Game.prototype.AcionaImigo3 = function() {

    //array do inimigo3
    livingEnemies.length = 0;

    inimigosTipo3.forEach(function(inimigoTipo1Tmp) {

        // carrega na lista  todos os inimigos do tipo 1 
        livingEnemies.push(inimigoTipo1Tmp);

    });

    if (livingEnemies.length > 0)
    {
        var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
        // randomly select one of them
        var shooter = livingEnemies[random];
        if (((playerScene.getPlayer().x - shooter.body.x < 500 && playerScene.getPlayer().x - shooter.body.x > 0) && ((playerScene.getPlayer().y - shooter.body.y < 500 && playerScene.getPlayer().y - shooter.body.y > 0) || (shooter.body.y - playerScene.getPlayer().y < 500 && shooter.body.y - playerScene.getPlayer().y > 0))) || ((shooter.body.x - playerScene.getPlayer().x < 500 && shooter.body.x - playerScene.getPlayer().x > 0) && ((playerScene.getPlayer().y - shooter.body.y < 500 && playerScene.getPlayer().y - shooter.body.y > 0) || (shooter.body.y - playerScene.getPlayer().y < 500 && shooter.body.y - playerScene.getPlayer().y > 0)))) {
            game.physics.arcade.moveToObject(shooter, playerScene.getPlayer(), 220);
            tiroInimigoTimer = game.time.now + 30;
        }
    }
};

Game.prototype.tirosInimigo2 = function() {

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
        if (((playerScene.getPlayer().x - shooter.body.x < 300 && playerScene.getPlayer().x - shooter.body.x > 0) && ((playerScene.getPlayer().y - shooter.body.y < 300 && playerScene.getPlayer().y - shooter.body.y > 0) || (shooter.body.y - playerScene.getPlayer().y < 300 && shooter.body.y - playerScene.getPlayer().y > 0))) || ((shooter.body.x - playerScene.getPlayer().x < 300 && shooter.body.x - playerScene.getPlayer().x > 0) && ((playerScene.getPlayer().y - shooter.body.y < 300 && playerScene.getPlayer().y - shooter.body.y > 0) || (shooter.body.y - playerScene.getPlayer().y < 300 && shooter.body.y - playerScene.getPlayer().y > 0)))) {
            tiroInimigo2.reset(shooter.body.x, shooter.body.y);

            game.physics.arcade.moveToObject(tiroInimigo2, playerScene.getPlayer(), 220);
            tiroInimigoTimer = game.time.now + 100;
        }
    }
};

Game.prototype.colisaoByTiroInimigoByPlayer = function(player, tiroInimigo) {
    console.log("colisao tiro");
    tiroInimigo.kill();
    // cria as explosao :)
    var explosion = explosoes.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('explosao', 30, false, true);

    //decrementa uma vida
    lifeScene.controleVidas();
//    this.controleVidas();

    if (lifeScene.getVida() < 1)
    {
        player.kill();
        textoGameOver.text = " GAME OVER \n Click to restart";
        textoGameOver.visible = true;

        this.posicionaTextoGameOverCentroCamera();
        game.input.onTap.addOnce(this.restart, this);
    }
};

Game.prototype.restart = function() {

    //  A new level starts

    //resets the life count
    lifeScene.setVida(50);
    //  And brings the aliens back from the dead :)
    inimigoTipo2.removeAll();
    this.inimigosTipo1.removeAll();
    this.create();

    //revive o player
    playerScene.getPlayer().revive();
    //hides the text
    textoGameOver.visible = false;

};

Game.prototype.criar = function() {
    var pessoa = this.inimigosTipo1.create(30, game.world.height - 300, 'inimigoTipo1');
    game.physics.enable(pessoa, Phaser.Physics.ARCADE);
    pessoa.body.velocity.x = -Math.random() * 10;
    pessoa.body.velocity.y = -Math.random() * 10;
    pessoa.body.collideWorldBounds = true;
    pessoa.body.bounce.set(1);
};

Game.prototype.posicionaTextoGameOverCentroCamera = function() {
    textoGameOver.x = game.camera.x + 400;
    textoGameOver.y = game.camera.y + 300;
};

Game.prototype.testeColisao = function() {
    console.log("pos colisao");
};

Game.prototype.colisaoByNaveByInimigo = function(player, inimigo) {
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
    lifeScene.controleVidas();
//    this.controleVidas();

    if (lifeScene.getVida() < 1)
    {
        player.destroy();

        textoGameOver.text = " GAME OVER \n Click to restart";
        textoGameOver.visible = true;
        this.posicionaTextoGameOverCentroCamera();
        game.input.onTap.addOnce(this.restart, this);

    }


};

Game.prototype.colisaoBytirosPlayerByinimigoTipo1 = function(tiro, inimigoTipo1) {
    tiro.kill();
    inimigoTipo1.destroy();
    // cria as explosao :)
    var explosion = explosoes.getFirstExists(false);
    explosion.reset(inimigoTipo1.body.x, inimigoTipo1.body.y);
    explosion.play('explosao', 30, false, true);
    //pontuacao
    scoreScene.pontuacao(20);
};

Game.prototype.colisaoBytirosPlayerByinimigo = function(tiro, inimigo) {
    tiro.kill();
    inimigo.destroy();
    // cria as explosões :)
    var explosion = explosoes.getFirstExists(false);
    explosion.reset(inimigo.body.x, inimigo.body.y);
    explosion.play('explosao', 30, false, true);
    //pontuacao
    scoreScene.pontuacao(20);
};

Game.prototype.inicializarAnimacaoExplosao = function(objetoAux) {
    objetoAux.anchor.x = 0.5;
    objetoAux.anchor.y = 0.5;
    objetoAux.animations.add('explosao');
};




