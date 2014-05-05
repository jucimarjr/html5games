var hero = null;
var level = null;
State.Game = function(game){
	hero = new Hero(game);
	level = new Level(game);
};
State.Game.prototype = {
	preload: function(){
		level.preload();
		hero.preload();
	},
	create: function(){
		level.create();
		hero.create();
	},
	update:function(){
		hero.update();
	}
};
	