EnemyGroup = function(gameClass,nomeSprite,nomeAnimacao,quantidadeAnimacao) {
	this.game = gameClass.game;
    this.gameClass = gameClass;
    this.enemyGroup = null;
    this.bullet = null;
    
    //this.create(this.game);
};

EnemyGroup.prototype.create = function(game){
	this.enemyGroup = game.add.group(x * 30 + game.world.centerX / 2, y * 30,nomeSprite);
	this.enemyGroup.enableBody = true;
	this.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
	
	//for(var y = 0; y < 2; y++){
		//for(var x = 0; x < 5; x++){
			//var enemy = new Enemy(this.gameClass,"enemy"+x+"-"+y,nomeSprite,nomeAnimacao,quantidadeAnimacao);
			//enemy.body.moves = false;
		//}
	//}
	
};

EnemyGroup.prototype.update = function(){
	if(this.bullet!=null){
		game.physics.overlap(this.bullet, this.enemyGroup, collisionHandler, null, this);
	}
};

EnemyGroup.prototype.getBulletCollide(bullet){
	this.bullet = bullet;
}

EnemyGroup.prototype.die = function(bullet,enemy){
	bullet.kill();
	enemy.kill();
}