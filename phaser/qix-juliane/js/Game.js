var Game = {};

Game = function() {
	screen = null;
	ball = null;
	draw = null;
	
	coordinates = function() {
		x : 0;
		y : 0;
	};
};

Game.prototype = {
	preload : function() {
		screenGame = screenClass;
	
		ball = new Ball();
		ball.preload();
		
		draw = new Draw();
	},

	create : function() {
		ball.create();
		draw.create();
	},
	
	update : function() {
		ball.update();
		draw.update(ball.direction, ball.positionInitial);
	}
};
