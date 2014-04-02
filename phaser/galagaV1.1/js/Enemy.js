var Enemy = function(gameClass,nome,nomeSprite,nomeAnimacao,quantidadeAnimacao) {
    this.gameClass = gameClass;
	this.x0 = gameClass.game.width/2;
    this.y0 = 300;
    this.x = 0;
    this.y = 0;
    this.game = gameClass.game;
    this.health = 3;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;
    this.teste = false;

    this.enemy = gameClass.game.add.sprite(this.x0, this.y0, nome, nomeSprite);
    this.enemy.scale.setTo(2,2);
    
    this.enemy.animations.add(nomeAnimacao);
    this.enemy.animations.play(nomeAnimacao,quantidadeAnimacao,true);
    
    this.bullets = game.add.group();
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	
	
	this.bullets.createMultiple(50,'bullet-enemy');
	this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
	this.bullets.setAll('outOfBoundsKill', true);
	
	this.bulletTime = 1000;
	//this.enemy.events.onOutOfBounds.add(this.gameClass.outOfBounds, this);
    
};

Enemy.prototype.update = function(){
	
	//var rand = game.rnd.integerInRange(5,20);
	this.game.physics.collide(this.gameClass.ship.sprite, this.bullets, this.gameClass.ship.die, null, this);
	//if(this.game.time.now > this.bulletTime){
		//this.fire();
	//}
	if(this.enemy.body.y > 600){
		console.log(">>>>>>>>reset");
		this.teste = true;
		this.enemy.reset(this.x,-12);
		console.log("x0",this.x0);
		console.log("y0",this.y0);
		this.gameClass.game.physics.moveToXY(this.enemy, this.x0, this.y0);
	}
	if(this.enemy.body.y > this.x0 && this.teste){
		this.enemy.body.velocity.x = 0;
		this.enemy.body.velocity.y = 0;
		this.teste = false;
	}
	
	
	
	//console.log("body y",this.enemy.body.y);
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
            bullet.reset(this.enemy.x+15, this.enemy.y+15);//posicáo de saida do tiro
            bullet.body.velocity.y = +50; //velocidade do projetil
            this.bulletTime = game.time.now + 200;
        }
    }

}

Enemy.prototype.move = function (x,y) {

	//bullet = this.bullets.getFirstExists(false);
    //if (bullet)
    //{
        //  And fire it
	this.x = x;
	this.y = y;
	//this.enemy.reset(this.enemy.x, this.enemy.y);//posicáo de saida do tiro
    this.gameClass.game.physics.moveToXY(this.enemy, x, y);//velocidade do projetil
        //this.bulletTime = game.time.now + 200;
    //}
	        
	 
};
