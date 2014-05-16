/*global Phaser*/

//Global
var Config = {
	global: {
		animationVelocity: 6,
		screen: {
			width: 960,
			height: 600,
			resize: function (game) {
				"use strict";
				if(window.innerHeight < 600 || window.innerWidth < 960){
					game.scale.setExactFit();
					game.scale.refresh();
				} 
			}
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

//SponsorSplash
Config.sponsorSplash = {
	dir: 'assets/images/SponsorSplash_960-600.png',
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
	buttonHowToPlay: {
		dir: 'assets/spritesheets/ButtonHowToPlay_600-95.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.6,
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
		y: Config.global.screen.height * 0.8,
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

//HowToPlay
Config.howToPlay = {
	dir: 'assets/images/HowToPlay_960-600.png',
	x: 0,
	y: 0
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
		normal: 'assets/spritesheets/HeroNormal_180-60.png',
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
	gravity: 1000,
	jump: {
		max: 25
	},
	anchor: {
		right: {
			x: 0,
			y: 0.5
		},
		left: {
			x: 0.5,
			y: 0.5
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
			hit: [0, 1]
		}
	}
};

//ButtonHit
Config.buttonHit = {
	dir: 'assets/spritesheets/ButtonHit_1920-150.png',
	x: 0,
	y: 450,
	frame: {
		width: 960,
		height: 150,
		over: 0,
		out: 0,
		down: 1,
		up: 0
	},
	key: Phaser.Keyboard.Z
};

//ButtonLeft
Config.buttonLeft = {
	dir: 'assets/spritesheets/ButtonLeft_960-270.png',
	x: 0,
	y: 225,
	frame: {
		width: 480,
		height: 225,
		over: 0,
		out: 0,
		down: 1,
		up: 0
	},
	key: Phaser.Keyboard.LEFT
};

//ButtonRight
Config.buttonRight = {
	dir: 'assets/spritesheets/ButtonRight_960-270.png',
	x: 480,
	y: 225,
	frame: {
		width: 480,
		height: 225,
		over: 0,
		out: 0,
		down: 1,
		up: 0
	},
	key: Phaser.Keyboard.RIGHT
};

//ButtonUp
Config.buttonUp = {
	dir: 'assets/spritesheets/ButtonUp_640-270.png',
	x: 320,
	y: 0,
	frame: {
		width: 320,
		height: 225,
		over: 0,
		out: 0,
		down: 1,
		up: 0
	},
	key: Phaser.Keyboard.UP
};

//ButtonJumpLeft
Config.buttonJumpLeft = {
	dir: "assets/spritesheets/ButtonJumpLeft_640-270.png",
	x: 0,
	y: 0,
	frame: {
		width: 320,
		height: 225,
		over: 0,
		out: 0,
		down: 1,
		up: 0
	}
};

Config.buttonJumpRight = {
	dir: "assets/spritesheets/ButtonJumpRight_640-270.png",
	x: 640,
	y: 0,
	frame: {
		width: 320,
		height: 225,
		over: 0,
		out: 0,
		down: 1,
		up: 0
	}
};

//SmallDragon
Config.smallDragon = {
	dir: 'assets/spritesheets/SmallDragon_90-60.png',
	velocity: 150,
	xi: 1920,
	yi: 0,
	damage: Config.hero.health.initial / 600,
	intervalBorning: {
		actual: 30000,
		min: 20000,
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
		move: [0, 1]
	},
	number: 10
};

//Fire
Config.fire = {
	dir: 'assets/spritesheets/Fire_20-10.png',
	number: 100,
	animationVelocity: 42,
	frame: {
		hight: 10,
		width: 10,
		move: [0, 1]
	},
	range: 500,
	damage: Config.hero.health.initial / 6000,
	intervalShooting: 100,
	adjust: {
		x: 15,
		y: 30
	},
	velocity: Config.smallDragon.velocity + 100,
	lifespan: 3000
};

//Life
Config.life = {
	dir: 'assets/images/Life_20-20.png',
	x: 0,
	y: 0,
	distanceBetween: 20,
	number: 4
};

//Dragon
Config.dragon = {
	dir: 'assets/spritesheets/Boiuna_360-270.png',
    layer: 'LayerDragon',
    gid: 21,
    xf: Config.global.screen.width * 2 + 50,
	frame: {
		width: 90,
		height: 90,
        move: {
            one: 0,
            two: 1,
            three: 2,
            four: 3
        }
	},
    timeGrow: 1000 / Config.global.animationVelocity,
    number: {
        pieces: 5
    }
};

//Princess
Config.princess = {
	dir: 'assets/spritesheets/Princess_150-60.png',
	frame: {
		width: 30,
		height: 60
	}
};