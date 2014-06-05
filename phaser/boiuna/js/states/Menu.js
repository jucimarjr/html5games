/*global State, Config*/

State.Menu = function (game) {
	"use strict";
	this.game = game;
};
State.Menu.prototype = {
	create: function () {
		"use strict";
		var background, buttonPlay, buttonCredits, buttonHowToPlay;
		background = this.game.add.sprite(Config.menu.x, Config.menu.y, 'menu-background');
		buttonPlay = this.game.add.button(Config.menu.buttonPlay.x, Config.menu.buttonPlay.y, 'button-play', this.clickPlay, this, Config.menu.buttonPlay.frame.over, Config.menu.buttonPlay.frame.out, Config.menu.buttonPlay.frame.down, Config.menu.buttonPlay.frame.up);
		buttonPlay.anchor.setTo(Config.menu.buttonPlay.anchor.x, Config.menu.buttonPlay.anchor.y);
		buttonHowToPlay = this.game.add.button(Config.menu.buttonHowToPlay.x, Config.menu.buttonHowToPlay.y, 'button-how-to-play', this.clickHowToPlay, this, Config.menu.buttonHowToPlay.frame.over, Config.menu.buttonHowToPlay.frame.out, Config.menu.buttonHowToPlay.frame.down, Config.menu.buttonHowToPlay.frame.up);
		buttonHowToPlay.anchor.setTo(Config.menu.buttonHowToPlay.anchor.x, Config.menu.buttonHowToPlay.anchor.y);
		buttonCredits = this.game.add.button(Config.menu.buttonCredits.x, Config.menu.buttonCredits.y, 'button-credits', this.clickCredits, this, Config.menu.buttonCredits.frame.over, Config.menu.buttonCredits.frame.out, Config.menu.buttonCredits.frame.down, Config.menu.buttonCredits.frame.up);
		buttonCredits.anchor.setTo(Config.menu.buttonCredits.anchor.x, Config.menu.buttonCredits.anchor.y);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	clickPlay: function () {
		"use strict";
		this.game.state.start('Game');
	},
	clickHowToPlay: function () {
		"use strict";
		this.game.state.start('HowToPlayDesktop');
	},
	clickCredits: function () {
		"use strict";
		this.game.state.start('Credits');
	}
};