var Game = {};

Game = function() {
	screen = null;
	ball = null;
	qix = null;
	draw = null;
	
	coordinates = function() {
		x : 0;
		y : 0;
	};
};

Game.prototype = {
	preload : function() {
		screenGame = screenClass;

		qix = new Qix();
		qix.preload();
		
		ball = new Ball();
		ball.preload();

		draw = new Draw();
	},

	create : function() {
		game.world.bounds.y = screenGame.thicknessExtras;
		game.world.bounds.height -= screenGame.thicknessExtras;
		
		qix.create();
		ball.create();
		draw.create();
	},
	
	update : function() {
		qix.update();
		ball.update();
		draw.update(ball.direction, ball.positionInitial);
	}
};
