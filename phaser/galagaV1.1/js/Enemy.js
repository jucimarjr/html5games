var Enemy = function(gameClass,nome,nomeSprite,nomeAnimacao,quantidadeAnimacao) {
    var x = gameClass.game.width/2;
    var y = 400;
    this.game = gameClass.game;
    this.health = 3;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    this.enemy = gameClass.game.add.sprite(x, y, nome, nomeSprite);
	//this.enemy.enableBody = true;
    this.enemy.scale.setTo(4,4);
    
    this.enemy.animations.add(nomeAnimacao);
    this.enemy.animations.play(nomeAnimacao,quantidadeAnimacao,true);
    
};

Enemy.prototype.die = function(bullet,enemy){
	bullet.kill();
	enemy.kill();
	console.log("colidiu");
	//return true;
};
