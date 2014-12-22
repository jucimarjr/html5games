HighScores = function () {    
};

HighScores.prototype = {
	preload:function() {		
		game.load.image('bgHighScores', fp_bgHighScores);
	},
	
	create: function () {
		var bg = game.add.sprite(0, 0, 'bgHighScores');
		
		game.add.text(this.game.width / 2 - 150, 220, localStorage["nameScore1"], {
			font: "45px AndyBold", fill: "#ffffff", align: "center"
		});

		game.add.text(this.game.width / 2 + 100, 220, localStorage["score1"], {
			font: "45px AndyBold", fill: "#ffffff", align: "center"
		});

		game.add.text(this.game.width / 2 - 150, 280, localStorage["nameScore2"], {
			font: "45px AndyBold", fill: "#ffffff", align: "center"
		});

		game.add.text(this.game.width / 2 + 100, 280, localStorage["score2"], {
			font: "45px AndyBold", fill: "#ffffff", align: "center"
		});

		game.add.text(this.game.width / 2 - 150, 340, localStorage["nameScore3"], {
			font: "45px AndyBold", fill: "#ffffff", align: "center"
		});

		game.add.text(this.game.width / 2 + 100, 340, localStorage["score3"], {
			font: "45px AndyBold", fill: "#ffffff", align: "center"
		});

		game.add.text(this.game.width / 2 - 150, 400, localStorage["nameScore4"], {
			font: "45px AndyBold", fill: "#ffffff", align: "center"
		});

		game.add.text(this.game.width / 2 + 100, 400, localStorage["score4"], {
			font: "45px AndyBold", fill: "#ffffff", align: "center"
		});

		game.add.text(this.game.width / 2 - 150, 460, localStorage["nameScore5"], {
			font: "45px AndyBold", fill: "#ffffff", align: "center"
		});

		game.add.text(this.game.width / 2 + 100, 460, localStorage["score5"], {
			font: "45px AndyBold", fill: "#ffffff", align: "center"
		});
			
		game.input.onDown.add(function() {
			var fadeout = game.add.tween(bg).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout.onComplete.add(function() {
				game.state.start('sceneMenu');
			});
		});
	}
};