var Enemy = function(game,nome,nomeSprite,nomeAnimacao,quantidadeAnimacao) {
    var x = game.world.randomX;
    var y = game.world.randomY;
    this.game = game;
    this.health = 3;
   // this.player = player;
   // this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    this.enemy = game.add.sprite(x, y, nome, nomeSprite);
    this.enemy.animations.add(nomeAnimacao);
    this.enemy.animations.play(nomeAnimacao,quantidadeAnimacao,true);
    

    //this.shadow.anchor.set(0.5);
    //this.tank.anchor.set(0.5);
    //this.turret.anchor.set(0.3, 0.5);

    //this.tank.name = index.toString();

    //game.physics.enable(this.tank, Phaser.Physics.ARCADE);

//    this.tank.body.immovable = false;
//    this.tank.body.collideWorldBounds = true;
//    this.tank.body.bounce.setTo(1, 1);
//
//

    //.tank.angle = game.rnd.angle();



    //game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};

