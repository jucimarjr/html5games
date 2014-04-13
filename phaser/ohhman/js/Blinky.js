Blinky = function () {
	this.sprite = null;
	this.speed = 10;
	
	this.direction; //LEFT, RIGHT, UP, DOWN
};

Blinky.prototype = new Ghost();
