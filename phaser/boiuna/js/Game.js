var hero = null;
var level = null;
var smallDragon = null;
State.Game = function(game){
	level = new Level(game);
	hero = new Hero(game);
	smallDragon = new SmallDragon(game,hero);
};
State.Game.prototype = {
	preload: function(){
		level.preload();
		hero.preload();
		smallDragon.preload();
	},
	create: function(){
		level.create();
		hero.create();
		smallDragon.create();
	},
	update:function(){
		hero.update();
		smallDragon.update();
	}
};
	