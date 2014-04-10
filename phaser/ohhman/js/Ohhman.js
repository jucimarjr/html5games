var Ohhman = function () {
	this.ohhman = null;
	this.inititalPosition = null;
	this.direction; //LEFT, RIGHT, UP, DOWN
	this.speed = 10;
};

Ohhman = function (game) {
	this.game = game;
};

Ohhman.prototype.preload = function () {
	game.load.image('ohhman', 'assets/images/pacMan_36-36.png');
};

Ohhman.prototype.create = function () {
	this.ohhman = game.add.sprite(0, 0, 'ohhman');	
};

Ohhman.prototype.update = function () {
	this.move();
};

Ohhman.prototype.move = function () {
	this.inititalPosition = this.ohhman.position;
		
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		this.direction = "LEFT";
		this.ohhman.x -= this.speed;
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.direction = "RIGHT";
		this.ohhman.x += this.speed;
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		this.direction = "UP";
		this.ohhman.y -= this.speed;
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.direction = "DOWN";
		this.ohhman.y += this.speed;
	}	

};