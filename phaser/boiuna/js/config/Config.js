/*global Phaser*/

//Global
var Config = {
	global: {
		animationVelocity: 8,
		screen: {
			width: 960,
			height: 600,
			resize: function (game) {
				"use strict";
				if (window.innerHeight < 600 || window.innerWidth < 960) {
					game.scale.setExactFit();
					game.scale.refresh();
				}
			}
		},
		key: {
			nextScreen: Phaser.Keyboard.ENTER,
			annoying: [Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.DOWN]
		}
	}
};

//Audio
Config.audio = {
	dir: {
		music: {
			normal: 'assets/audios/MusicNormal.mp3',
			lose: 'assets/audios/MusicLose.mp3'
		}
	}
};

//LudusSplash
Config.ludusSplash = {
	dir: 'assets/images/LudusSplash_960-600.png',
	x: 0,
	y: 0,
	dim: 0,
	time: {
		dim: 2000,
		nextState: 4000
	}
};

//SponsorSplash
Config.sponsorSplash = {
	dir: 'assets/images/SponsorSplash_960-600.png',
	x: 0,
	y: 0,
	dim: 0,
	time: {
		dim: 2000,
		nextState: 4000
	}
};

//GameSplash
Config.gameSplash = {
	dir: {
		background: 'assets/images/GameSplash_960-600.png',
		progressBar: 'assets/images/ProgressBar_960-30.png'
	},
	progressBar: {
		x: 0,
		y: 560
	},
	x: 0,
	y: 0,
	time: {
		nextState: 3000
	}
};

//StoryBefore
Config.storyBefore = {
	dir: 'assets/images/StoryBefore_960-600.png',
	x: 0,
	y: 0
};

//StoryAfter
Config.storyAfter = {
	dir: 'assets/images/StoryAfter_960-600.png',
	x: 0,
	y: 0
};


//Menu
Config.menu = {
	dir: 'assets/images/MenuBackground_960-600.png',
	x: 0,
	y: 0,
	buttonPlay: {
		dir: 'assets/spritesheets/ButtonPlay_141-75_3.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.55,
		frame: {
			width: 141,
			height: 75,
			over: 1,
			out: 0,
			down: 2,
			up: 1
		},
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/spritesheets/ButtonHowToPlay_275-75_3.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.7,
		frame: {
			width: 275,
			height: 75,
			over: 0,
			out: 1,
			down: 2,
			up: 0
		},
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/spritesheets/ButtonCredits_204-75_3.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.85,
		frame: {
			width: 204,
			height: 75,
			over: 2,
			out: 1,
			down: 0,
			up: 0
		},
		anchor: {
			x: 0.5,
			y: 0.5
		}
	}
};

//HowToPlayMobile
Config.howToPlayMobile = {
	dir: 'assets/images/HowToPlayMobile_960-600.png',
	x: 0,
	y: 0
};

//HowToPlayDesktop
Config.howToPlayDesktop = {
	dir: 'assets/images/HowToPlayDesktop_960-600.png',
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
	y: 0,
	dim: 0.1,
	message: {
		text: {
			yourTimeWas: "O seu tempo foi: ",
			seconds: "segundos",
			bestWinScore: "Melhor tempo: "
		},
		style: {
			font: '40px Old English Text MT',
			fill: '#ffc90e'
		},
		anchor: {
			x: 0.5,
			y: 0.5
		}
	}
};

//DefeatScreen
Config.defeatScreen = {
	dir: {
		background: 'assets/images/DefeatScreen_960-600.png',
		music: 'assets/audios/MusicLose.mp3'
	},
	x: 0,
	y: 0,
	dim: 0.1,
	message: {
		text: {
			youGot: "Chegou a faltar apenas: ",
			dragonPart: "partes do dragão",
			bestLoseScore: "Melhor resultado: "
		},
		style: {
			font: '40px Old English Text MT',
			fill: '#ffc90e'
		},
		anchor: {
			x: 0.5,
			y: 0.5
		}
	}
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
	dir: 'assets/map/Tilemap.json'
};

//Platform
Config.platforms = {
	dir: 'assets/map/Terrain_150-30.png',
	layer: 'LayerMain',
	tileset: 'Terrain',
	height: 30,
	width: 150
};

//Grass
Config.grass = {
	dir: 'assets/map/Grass_30-30.png',
	layer: 'LayerUpper',
	tileset: 'Grass'
};

//Hero
Config.hero = {
	dir: {
		normal: 'assets/map/HeroNormal_78-96_6.png',
		attack: 'assets/spritesheets/HeroAttack_62-96_2.png'
	},
	layer: 'LayerHero',
	gid: 10,
	health: {
		initial: 100
	},
	alpha: {
		hurt: 0.3,
		die: 0.3
	},
	time: {
		tween: {
			hurt: {
				dim: {
					min: 100,
					max: 100
				}
			},
			die: {
				dim: {
					min: 3000
				}
			}
		}
	},
	velocity: {
		initial: {
			x: 0,
			y: 0
		},
		run: {
			normal: 280,
			attack: 180
		},
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
			width: 78,
			height: 96,
			stopped: 0,
			jumping: 3,
			falling: 4,
			run: [1, 5, 2, 0]
		},
		attack: {
			width: 62,
			height: 96,
			hit: [0, 1]
		}
	},
	body: {
		size: {
			normal: {
				width: 78,
				height: 96
			},
			attack: {
				width: 78,
				height: 96
			}
		}
	}
};

//ButtonHit
Config.buttonHit = {
	dir: 'assets/spritesheets/ButtonHit_960-150_2.png',
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
	dir: 'assets/spritesheets/ButtonLeft_480-225_2.png',
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
	dir: 'assets/spritesheets/ButtonRight_480-225_2.png',
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
	dir: 'assets/spritesheets/ButtonUp_320-225_2.png',
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
	dir: "assets/spritesheets/ButtonJumpLeft_320-225_2.png",
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
	dir: "assets/spritesheets/ButtonJumpRight_320-225_2.png",
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
	dir: 'assets/spritesheets/SmallDragon_95-52_4.png',
	velocity: 150,
	xi: 1920,
	yi: 0,
	distance: {
		hero: 150
	},
	damage: Config.hero.health.initial / 600,
	intervalBorning: {
		actual: 10000,
		min: 5000,
		decrement: 1000
	},
	anchor: {
		left: {
			x: 0,
			y: 0.5
		},
		right: {
			x: 0.5,
			y: 0.5
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
		width: 95,
		height: 52,
		move: [0, 1, 2, 3]
	},
	number: 10
};

//Fire
Config.fire = {
	dir: 'assets/spritesheets/Fire_10-10_4.png',
	number: 100,
	animationVelocity: 24,
	frame: {
		hight: 10,
		width: 10,
		move: [0, 1, 2, 3]
	},
	range: 500,
	damage: Config.hero.health.initial / 6000,
	intervalShooting: 100,
	adjust: {
		x: 60,
		y: 5
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
	dir: 'assets/map/Boiuna_90-90_8.png',
	layer: 'LayerDragon',
	gid: 16,
	xf: Config.level.worldBounds.xf + 90,
	xi: Config.level.worldBounds.xi - 90,
	frame: {
		width: 90,
		height: 90,
		start: 0,
		move: {
			head: [0, 1, 2, 3],
			body: [7, 6, 5, 4]
		}
	},
	timeGrow: 1000 / Config.global.animationVelocity,
	number: {
		pieces: 10
	},
	velocity: 140,
	damage: Config.hero.health.initial / 1000
};

//Lady
Config.lady = {
	dir: 'assets/map/Lady_51-78_3.png',
	layer: 'LayerLady',
	gid: 7,
	frame: {
		width: 51,
		height: 78,
		stay: [0, 1, 2, 1]
	}
};

//Princess
Config.princess = {
	dir: 'assets/spritesheets/Princess_45-78_3.png',
	frame: {
		width: 45,
		height: 78,
		start: 0,
		stay: [0, 1, 2, 1]
	},
	gravity: 100
};

//Score
Config.score = {
	message: {
		x: Config.global.screen.width - 50,
		y: 0,
		style: {
			font: '40px Old English Text MT',
			fill: '#880015'
		},
		anchor: {
			x: 1,
			y: 0
		}
	}
};