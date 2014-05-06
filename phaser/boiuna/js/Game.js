/*global State, Config, Phaser, Level, Platforms, Hero, SmallDragon*/
State.Game = function (game) {
    "use strict";
	this.level = new Level(game);
    this.platforms = new Platforms(game);
	this.hero = new Hero(game, this.platforms);
	this.smallDragon = new SmallDragon(game, this.hero);
    this.game = game;
};
State.Game.prototype = {
	preload: function () {
        "use strict";
		this.level.preload();
        this.platforms.preload();
        this.hero.preload();
		this.smallDragon.preload();
	},
	create: function () {
        "use strict";
		this.level.create();
		this.hero.create();
        this.platforms.create();
		this.smallDragon.create();
	},
	update: function () {
        "use strict";
		this.hero.update();
		this.smallDragon.update();
	}
};
/*
class State.Game{
    public int level;
    public int platforms;
    public int hero;
    public int smallDragon;
    
    
    
}*/