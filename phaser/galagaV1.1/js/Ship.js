Ship = function(gameClass) {
	this.game = gameClass.game;
    this.gameClass = gameClass;
    this.sprite = null;
    
    this.bullets = null;
    this.bulletTime = 0;
    this.fireRate = 100;

    this.nextFire = 0;

    this.create(this.game);
};


Ship.prototype.create = function(game){
	
	this.sprite = this.game.add.sprite(this.game.width / 2-15, 550,'ship','ShipWhite2_20-30.png');
	this.sprite.anchor.setTo(0.5,0.5);
	this.sprite.enableBody = true;
	
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	
	this.bullets.createMultiple(50,'bullet');
	this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
	this.bullets.setAll('outOfBoundsKill', true);


};

Ship.prototype.update = function () {	
	
	 
   //console.log("enemy"+this.gameClass.enemy1);
  //if(this.gameClass.enemy1.die())
   //var teste =  
  // this.game.physics.collide(this.gameClass.enemy1.enemy, this.bullets, this.gameClass.enemy1.die, null, this);
   //console.log(">>bullet "+this.bullets);
};

Ship.prototype.animate = function(){
};

Ship.prototype.stop = function(){
	this.sprite.body.velocity.x = 0;
	
}

Ship.prototype.move = function (direction) {

	if( direction == "left" && this.sprite.x > 12){
	    this.sprite.x -= 10;
	}
	        
	else if (direction == "right" && this.sprite.x < this.game.width-12){
	    this.sprite.x += 10;
	 }
	 
};

 	
Ship.prototype.shoot = function () {    
    

};

Ship.prototype.destroyShoot = function (shoot) {
	
};

Ship.prototype.die = function (spaceShip, asteroid) {

};

Ship.prototype.setSpriteShip = function(sprite){
	this.sprite = sprite;
}

Ship.prototype.getSpriteShip = function(){
	return this.sprite;
}

Ship.prototype.fire = function(){
	if (this.game.time.now > this.bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(this.sprite.x, this.sprite.y);//posicáo de saida do tiro
            bullet.body.velocity.y = -800; //velocidade do projetil
            this.bulletTime = game.time.now + 200;
        }
    }

}

Ship.prototype.die = function(bullet,ship){
	bullet.kill();
	ship.kill();
}
