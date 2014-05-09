//FabioLahis


//Global
var Config = {
    global: {
        animationVelocity: 6,
        screen: {
            width: 960,
            height: 600
        }
    }
};

//LudusSplash
Config.ludusSplash = {
	dir: 'assets/images/LudusSplash_960-600.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//GameSplash
Config.gameSplash = {
	dir: 'assets/images/GameSplash_960-600.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//Menu
Config.menu = {
	dir: 'assets/images/MenuBackground_960-600.png',
	x: 0,
	y: 0,
	buttonPlay: {
		dir: 'assets/spritesheets/ButtonPlay_600-95.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.4,
		width: 149,
		height: 94,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/spritesheets/ButtonCredits_600-95.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.7,
		width: 149,
		height: 94,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	textStyle: {
		font: '25px Ms Sans Serif',
		fill: '#ffffff'
	}
};

//Credits
Config.credits = {
	dir: 'assets/images/Credits_960-600.png',
	x: 0,
	y: 0
};

//VictoryScreen
Config.victoryScreen = {
    dir: 'assets/images/VictoryScreen_960-600.png',
	x: 0,
	y: 0
};

//DefeatScreen
Config.defeatScreen = {
	dir: 'assets/images/DefeatScreen_960-600.png',
	x: 0,
	y: 0
};

//Level
Config.level = {
	dir: 'assets/images/GameBackground_1920-600.png',
	x: 0,
	y: 0,
	worldBounds: {
		xi: 0,
		yi: 0,
		xf: 1920,
		yf: 600
	}
};

//Tilemap
Config.tilemap = {
    dir: 'assets/images/Tilemap.json'
};

//Platform
Config.platforms = {
    dir: 'assets/images/Terrain_150-30.png',
    layer: 'LayerMain',
    tileset: 'Terrain'
};

//Grass
Config.grass = {
    dir: 'assets/images/Grass_30-30.png',
    layer: 'LayerUpper',
    tileset: 'Grass'
};

//Hero
Config.hero = {
	dir: {
        normal: 'assets/spritesheets/Hero_180-60.png',
        attack: 'assets/spritesheets/HeroAttack_120-60.png'
    },
    layer: 'LayerHero',
    gid: 12,
    health: {
        initial: 100
    },
	velocity: {
		initial: {
			x: 0,
			y: 0
		},
		run: 200,
		jump: -300
	},
	gravity: 9000,
	jump: {
		max: 80
	},
	anchor: {
		right: {
			x: 0,
			y: 0
		},
		left: {
			x: 0.5,
			y: 0
		}
	},
	scale: {
		right: {
			x: 1,
			y: 1
		},
		left: {
			x: -1,
			y: 1
		}
	},
	frame: {
        normal: {
            width: 30,
            height: 60,
            stopped: 0,
            jumping: 3,
            falling: 4,
            run: {
                one: 1,
                two: 2
            }
        },
        attack: {
            width: 60,
            height: 60,
            one: 0,
            two: 1
        }
    }
};

//SmallDragon
Config.smallDragon = {
	dir: 'assets/spritesheets/SmallDragon_90-60.png',
	layer: 'LayerSmallDragon',
    gid: 18,
    velocity: 150,
    xi: 1920,
    yi: 0,
    damage: Config.hero.health.initial / 600,
    intervalBorning: {
        actual: 10000,
        min: 5000,
        decrement: 1000
    },
	anchor: {
		left: {
			x: 0,
			y: 0
		},
        right: {
			x: 0.5,
			y: 0
		}
	},
	scale: {
		right: {
			x: -1,
			y: 1
		},
		left: {
			x: 1,
			y: 1
		}
	},
	frame: {
		width: 30,
		height: 60,
        normal: {
            move: {
                one: 0,
                two: 1
            }
        }
	},
    number: 10
};

//Life

Config.life = {
    dir: 'assets/images/Life_20-20.png',
    x: 0,
    y: 0,
    distanceBetween: 20,
    number: 4
};
//FabioLahis
//JacksonAntonio
//JacksonAntonio