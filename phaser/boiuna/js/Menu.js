/*global State, Config*/

State.Menu = function (game) {
    "use strict";
    this.game = game;
};
State.Menu.prototype = {
	preload: function () {
        "use strict";
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.width, Config.menu.buttonPlay.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.width, Config.menu.buttonCredits.height);
	},
	create: function () {
        "use strict";
		var background, buttonPlay, buttonCredits;
        background = this.game.add.sprite(Config.menu.x, Config.menu.y, 'menu-background');
        buttonPlay = this.game.add.button(Config.menu.buttonPlay.x, Config.menu.buttonPlay.y, 'button-play', this.clickPlay, this, 0, 1, 2, 3);
		buttonPlay.anchor.setTo(Config.menu.buttonPlay.anchor.x, Config.menu.buttonPlay.anchor.y);
		buttonCredits = this.game.add.button(Config.menu.buttonCredits.x, Config.menu.buttonCredits.y, 'button-credits', this.clickCredits, this, 0, 1, 2, 3);
		buttonCredits.anchor.setTo(Config.menu.buttonCredits.anchor.x, Config.menu.buttonCredits.anchor.y);
	},
    clickPlay: function () {
	    "use strict";
		this.game.state.start('Game');
    },
    clickCredits: function () {
	    "use strict";
		this.game.state.start('Credits');
    }
};