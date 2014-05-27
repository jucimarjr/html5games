/*global Config, Phaser*/

var Score = function (game, dragon) {
	"use strict";
	this.game = game;
	this.game.score = this;
	this.dragon = dragon;
};
Score.prototype = {
	create: function () {
		"use strict";
		this.beginTime = this.game.time.totalElapsedSeconds();
		this.bestWinScore = window.localStorage.getItem("bestWinScore");
		this.bestLoseScore = window.localStorage.getItem("bestLoseScore");
		this.actualLoseScore = Config.dragon.number.pieces;
	},
	update: function () {
		"use strict";
		if (this.dragon.body.length < this.actualLoseScore && this.dragon.body.length > 0) {
			this.actualLoseScore = this.dragon.body.length;
		}
	},
	calculateWinScore: function () {
		"use strict";
		this.endTime = this.game.time.totalElapsedSeconds();
		this.timePlayed = Math.floor(this.endTime - this.beginTime);
		if (this.timePlayed < this.bestWinScore || !(this.bestWinScore)) {
			this.bestWinScore = this.timePlayed;
			window.localStorage.setItem("bestWinScore", this.timePlayed);
		}
	},
	calculateLoseScore: function () {
		"use strict";
		if (this.actualLoseScore < this.bestLoseScore || !(this.bestLoseScore)) {
			this.bestLoseScore = this.actualLoseScore;
			window.localStorage.setItem("bestLoseScore", this.actualLoseScore);
		}
	}
};