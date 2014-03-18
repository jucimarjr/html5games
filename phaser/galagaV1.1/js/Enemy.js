var Enemy = function(gameClass,nome,nomeSprite,nomeAnimacao,quantidadeAnimacao) {
    this.gameClass = gameClass;
	var x = gameClass.game.width/2;
    var y = 400;
    this.game = gameClass.game;
    this.health = 3;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    this.enemy = gameClass.game.add.sprite(x, y, nome, nomeSprite);
    this.enemy.scale.setTo(2,2);
    
    this.enemy.animations.add(nomeAnimacao);
    this.enemy.animations.play(nomeAnimacao,quantidadeAnimacao,true);
    
    this.bullets = game.add.group();
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	
	
	this.bullets.createMultiple(50,'bullet-enemy');
	this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
	this.bullets.setAll('outOfBoundsKill', true);
	
	this.bulletTime = 100;
    
};

Enemy.prototype.update = function(){
	this.game.physics.collide(this.gameClass.ship.sprite, this.bullets, this.gameClass.ship.die, null, this);
	if(this.game.time.now > this.bulletTime){
		this.fire();
	}
}

Enemy.prototype.die = function(bullet,enemy){
	bullet.kill();
	enemy.kill();
	console.log("colidiu");
	//return true;
};

Enemy.prototype.fire = function(){
	if (this.game.time.now > this.bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = this.bullets.getFirstExists(false);
        if (bullet)
        {
            //  And fire it
            bullet.reset(this.enemy.x, this.enemy.y);//posicáo de saida do tiro
            bullet.body.velocity.y = +50; //velocidade do projetil
            this.bulletTime = game.time.now + 200;
        }
    }

}
