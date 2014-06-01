/*global Config, Phaser*/

var Score = function (game, dragon) {
	"use strict";
	this.game = game;
	this.game.score = this;
	this.dragon = dragon;
	this.beginTime = null;
	this.bestWinScore = null;
	this.actualLoseScore = null;
	this.actualWinScore = null;
	this.textTime = null;
};
Score.prototype = {
	create: function () {
		"use strict";
		this.beginTime = this.game.time.totalElapsedSeconds();
		this.bestWinScore = window.localStorage.getItem("bestWinScore");
		this.bestLoseScore = window.localStorage.getItem("bestLoseScore");
		this.actualLoseScore = Config.dragon.number.pieces;
		this.actualWinScore = 0;
		this.textTime = this.game.add.text(Config.score.message.x, Config.score.message.y, String(this.actualWinScore), Config.score.message.style);
		this.textTime.anchor = Config.score.message.anchor;
		this.textTime.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		this.actualWinScore = Math.floor(this.game.time.totalElapsedSeconds() - this.beginTime);
		this.textTime.text = String(this.actualWinScore);
		if (this.dragon.body.length < this.actualLoseScore && this.dragon.body.length > 0) {
			this.actualLoseScore = this.dragon.body.length;
		}
	},
	calculateWinScore: function () {
		"use strict";
		if (this.actualWinScore < this.bestWinScore || !(this.bestWinScore)) {
			this.bestWinScore = this.actualWinScore;
			window.localStorage.setItem("bestWinScore", this.actualWinScore);
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