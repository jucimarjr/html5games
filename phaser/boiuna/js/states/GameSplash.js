/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		var sprite, progressBar;
		sprite = this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'game-splash');
		progressBar = this.game.add.sprite(Config.gameSplash.progressBar.x, Config.gameSplash.progressBar.y, 'progress-bar');
		this.game.load.setPreloadSprite(progressBar);
		this.game.load.onLoadComplete.add(this.nextState, this);
		this.loadAssets();
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	nextState: function () {
		"use strict";
		this.setAudios();
		setTimeout(function () {
			this.game.state.start('StoryBefore');
		}, Config.gameSplash.time.nextState);
	},
	setAudios: function () {
		"use strict";
		this.game.sound.add('music-normal', 1, true);
		this.game.sound.add('music-lose', 1, true);
		this.game.sound.play('music-normal', 1, true);
	},
	loadAssets: function () {
		"use strict";
		//Audios
		this.game.load.audio('music-normal', Config.audio.dir.music.normal);
		this.game.load.audio('music-lose', Config.audio.dir.music.lose);
		//StoryBefore
		this.game.load.image('story-before',  Config.storyBefore.dir);
		//StoryAfter
		this.game.load.image('story-after',  Config.storyAfter.dir);
		//Menu
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.frame.width, Config.menu.buttonPlay.frame.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.frame.width, Config.menu.buttonHowToPlay.frame.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.frame.width, Config.menu.buttonCredits.frame.height);
		//Credits
		this.game.load.image('credits', Config.credits.dir);
		//HowToPlayDesktop
		this.game.load.image('how-to-play-desktop', Config.howToPlayDesktop.dir);
		//HowToPlayMobile
		this.game.load.image('how-to-play-mobile', Config.howToPlayMobile.dir);
		//Level
		this.game.load.image('game-background', 'assets/images/GameBackground_1920-600.png');
		//Tilemap
		this.game.load.tilemap('tilemap', Config.tilemap.dir, null, Phaser.Tilemap.TILED_JSON);
		//Platforms
		this.game.load.image('terrain', Config.platforms.dir);
		//Grass
		this.game.load.image('grass', Config.grass.dir);
		//Hero
		this.game.load.spritesheet('hero-normal', Config.hero.dir.normal, Config.hero.frame.normal.width, Config.hero.frame.normal.height);
		this.game.load.spritesheet('hero-attack', Config.hero.dir.attack, Config.hero.frame.attack.width, Config.hero.frame.attack.height);
		//ButtonHit
		this.game.load.spritesheet('hit', Config.buttonHit.dir, Config.buttonHit.frame.width, Config.buttonHit.frame.height);
		//ButtonJumpLeft
		this.game.load.spritesheet('jump-left', Config.buttonJumpLeft.dir, Config.buttonJumpLeft.frame.width, Config.buttonJumpLeft.frame.height);
		//ButtonJumpRight
		this.game.load.spritesheet('jump-right', Config.buttonJumpRight.dir, Config.buttonJumpRight.frame.width, Config.buttonJumpRight.frame.height);
		//ButtonLeft
		this.game.load.spritesheet('left', Config.buttonLeft.dir, Config.buttonLeft.frame.width, Config.buttonLeft.frame.height);
		//ButtonRight
		this.game.load.spritesheet('right', Config.buttonRight.dir, Config.buttonRight.frame.width, Config.buttonRight.frame.height);
		//ButtonUp
		this.game.load.spritesheet('up', Config.buttonUp.dir, Config.buttonUp.frame.width, Config.buttonUp.frame.height);
		//Life
		this.game.load.image('life', Config.life.dir);
		//SmallDragon
		this.game.load.spritesheet('small-dragon', Config.smallDragon.dir, Config.smallDragon.frame.width, Config.smallDragon.frame.height);
		//Fire
		this.game.load.spritesheet('fire', Config.fire.dir, Config.fire.frame.width, Config.fire.frame.hight);
		//Lady
		this.game.load.spritesheet('lady', Config.lady.dir, Config.lady.frame.width, Config.lady.frame.height);
		//Dragon
		this.game.load.spritesheet('dragon', Config.dragon.dir, Config.dragon.frame.width, Config.dragon.frame.height);
		//Princess
		this.game.load.spritesheet('princess', Config.princess.dir, Config.princess.frame.width, Config.princess.frame.height);
		//DefeatScreen
		this.game.load.image('defeat-screen', Config.defeatScreen.dir.background);
		//VictoryScreen
		this.game.load.image('victory-screen', Config.victoryScreen.dir);
	}
};