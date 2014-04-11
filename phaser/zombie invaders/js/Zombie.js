var Zombie = function(gameClass) {
    this.game = gameClass.game;
    this.gameClass = gameClass;
	this.velocity = 30;
	this.zombie = null;
};

Zombie.prototype.create = function ( posX , posY) {
	
	
    
	this.move(this.zombie);
};

Zombie.prototype.move = function (zombie) {
	zombie.body.velocity.x = 10;
	zombie.body.velocity.y = 10;
}

Zombie.prototype.create = function(){
	for(var i = 0; i < 5; i++){
		//  Create a new sprite at a random world location
		grupoZumbis.create(10+(i*40), 300+(i*10), 'zombie');	    
	}
}

Zombie.prototype.die = function () {
  
};
