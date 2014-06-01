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
		nextState: 2000
	}
};

//Menu
Config.menu = {
	dir: 'assets/images/MenuBackground_960-600.png',
	x: 0,
	y: 0,
	buttonPlay: {
		dir: 'assets/spritesheets/ButtonPlay_150-95_4.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.45,
		frame: {
			width: 150,
			height: 95,
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
	buttonHowToPlay: {
		dir: 'assets/spritesheets/ButtonHowToPlay_150-95_4.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.65,
		frame: {
			width: 150,
			height: 95,
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
		dir: 'assets/spritesheets/ButtonCredits_150-95_4.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.85,
		frame: {
			width: 150,
			height: 95,
			over: 0,
			out: 1,
			down: 2,
			up: 0
		},
		anchor: {
			x: 0.5,
			y: 0.5
		}
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