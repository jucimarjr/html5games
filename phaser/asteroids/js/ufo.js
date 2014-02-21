var Ufo = function(gameClass){
	this.sprite = game.add.sprite(Math.random()*game.heigth, 0, 'sprites', 'ufo_96-61.png');
	/*
	this.sprite.scale.setTo(0.6,0.6);
	//this.sprite.events.onOutOfBounds.add(gameClass.outOfBounds,this);
	this.sprite.onOutOfBoundKill = true;
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	var direction = (45 - Math.random() * 90);
	this.sprite.body.velocity.x = Math.cos(direction*0.0174) *150;
	this.sprite.body.velocity.y = Math.sin(direction*0.0174) *150;
	*/
	this.game = gameClass.game;
    this.gameClass = gameClass;
	this.nextFire = 0;
	this.fireRate = 1000;
	this.shootsUfo = this.game.add.group();
};

Ufo.prototype.start = function(){
	if(this.sprite.alive){
		this.sprite.scale.setTo(0.6,0.6);
		//this.sprite.events.onOutOfBounds.add(gameClass.outOfBounds,this);
		this.sprite.onOutOfBoundKill = true;
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		var direction = (45 - Math.random() * 90);
		this.sprite.body.velocity.x = Math.cos(direction*0.0174) *150;
		this.sprite.body.velocity.y = Math.sin(direction*0.0174) *150;
	}else{
		this.sprite.reset(Math.random()*game.heigth, 0);
		this.sprite.body.velocity.x = Math.cos(direction*0.0174) *150;
		this.sprite.body.velocity.y = Math.sin(direction*0.0174) *150;
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