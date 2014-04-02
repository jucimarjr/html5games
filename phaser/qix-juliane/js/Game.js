var Game = {};

Game = function() {
	screen = null;
	ball = null;
	qix = null;
	line = null;
	shape = null;
	
	coordinates = function() {
		x : 0;
		y : 0;
	};
};

Game.prototype = {
	preload : function() {
		screenGame = screenClass;

		qix = new Qix();
		ball = new Ball();
		line = new Line();
		shape = new Shape();
		collision = new Collision();
		
		qix.preload();
		ball.preload();
	},

	create : function() {
		qix.create();
		ball.create();
		line.create(ball.sprite);
		shape.create();
	},
	
	update : function() {
		qix.update();
		ball.update();

		if ((ball.alive) && (!ball.collided))
			line.update(ball.sprite, ball.direction, ball.positionInitial);
		
		collision.update(ball.sprite);
	}
};
