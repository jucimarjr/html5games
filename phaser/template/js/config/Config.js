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
				if (window.innerHeight < 600 || window.innerWidth < 960) {
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
	dir: {
		background: 'assets/images/GameSplash_960-600.png',
		bar: 'assets/images/ProgressBar_960-30.png'
	},
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
		width: 150,
		height: 95,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/spritesheets/ButtonHowToPlay_600-95.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.6,
		width: 150,
		height: 95,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/spritesheets/ButtonCredits_600-95.png',
		x: Config.global.screen.width * 0.5,
		y: Config.global.screen.height * 0.8,
		width: 150,
		height: 95,
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