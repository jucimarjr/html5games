Ufo = function(gameClass){
	this.game = gameClass.game;
    this.gameClass = gameClass;
	this.sprite = game.add.sprite(0, Math.random()*game.heigth, 'ufo');
	this.sprite.events.onOutOfBounds.add(gameClass.outOfBounds,this);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.nextFire = 0;
	this.fireRate = 1000;
	var direction = (45 - Math.random() * 90);
	this.sprite.body.velocity.x = Math.cos(direction*0.0174) *50;
	this.sprite.body.velocity.y = Math.sin(direction*0.0174) *50;
	this.shootsUfo = this.game.add.group();
	setInterval(this.shoot(), 500);
};

Ufo.prototype.update = function(){
	if(this.sprite.x >= game.width){
		Ufo.kill();
	}
};

Ufo.prototype.shoot = function(){
	direction = Math.random() * 360;
    var shoot = this.shootsUfo.create(this.sprite.position.x + Math.cos(direction*0.0174) *24, this.sprite.position.y + Math.sin(direction*0.0174) *24, 'tiro');
    this.game.physics.velocityFromAngle(this.sprite.body.rotation - 90, 500, shoot.body.velocity);
    shoot.events.onOutOfBounds.add(this.destroyShoot, this);
};

Ufo.prototype.destroyShoot = function (shoot) {
	shoot.kill();
};