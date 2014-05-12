/*global State, Level, Life, Tilemap, Platforms, Hero, Grass, SmallDragon*/

State.Game = function (game) {
    "use strict";
    this.game = game;
	this.level = new Level(game);
    this.tilemap = new Tilemap(game);
    this.platforms = new Platforms(game, this.tilemap);
	this.hero = new Hero(game, this.tilemap, this.platforms);
    this.life = new Life(game, this.hero);
    this.grass = new Grass(game, this.tilemap);
	this.dragon = new Dragon(game, this.tilemap, this.hero);
	this.princess = new Princess(game, this.tilemap);
	this.smallDragon = new SmallDragon(game, this.hero);
};
State.Game.prototype = {
	preload: function () {
        "use strict";
		this.level.preload();
        this.tilemap.preload();
        this.platforms.preload();
        this.hero.preload();
        this.life.preload();
        this.grass.preload();
		this.dragon.preload();
		this.princess.preload();
		this.smallDragon.preload();
	},
	create: function () {
        "use strict";
		this.level.create();
        this.tilemap.create();
        this.platforms.create();
		this.hero.create();
        this.life.create();
        this.grass.create();
		this.dragon.create();
		this.princess.create();
		this.smallDragon.create();
	},
	update: function () {
        "use strict";
		this.hero.update();
        this.life.update();
		this.dragon.update();
		this.princess.update();
		this.smallDragon.update();
	}
};