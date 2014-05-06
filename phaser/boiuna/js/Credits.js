/*global State, Config, Phaser*/
State.Credits = function (game) {
    "use strict";
};
State.Credits.prototype = {
	preload: function () {
        "use strict";
        this.game.load.image('credits', Config.credits.dir);
	},
	create: function () {
		"use strict";
        var background = this.game.add.sprite(Config.credits.x, Config.credits.y, 'credits');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
	},
	update: function () {
		"use strict";
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('Menu');
		}
	},
    onClick: function () {
        "use strict";
        this.game.state.start('Menu');
    }
};
