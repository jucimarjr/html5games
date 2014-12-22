HighScoresInput = function () {    
};

HighScoresInput.prototype = {

	create:function() {
		var scorePosition = this.verifyScore( score.score );
		
		if (scorePosition != 0)
			this.inputName(score.score,scorePosition);
		else
			game.state.start('sceneMenu');

	},
	
	
	verifyScore: function (score) {

		if (score > localStorage["score1"])
			return 1;
		else if (score > localStorage["score2"])
			return 2;
		else if (score > localStorage["score3"])
			return 3;
		else if (score > localStorage["score4"])
			return 4;
		else if (score > localStorage["score5"])
			return 5;
		else
			return 0;

	},
	
	setLocalStorageScore: function (score, position) {

		for (var i = 5 ; i >= position ; i--) {
			if (i != position) {
				var scoreTemp = localStorage["score" + (i-1)];
				var nameScoreTemp = localStorage["nameScore" + (i-1)];
				localStorage["score" + i] = scoreTemp;
				localStorage["nameScore" + i] = nameScoreTemp;
			} else {
				localStorage["score" + position] = score;
				var name = prompt("Enter your name:","");
				while( name.length > 8 ){
					alert("Maximum 8 letters!");
					name = prompt("Enter your name:","");
				}
				localStorage["nameScore" + position] = name;
			}
		}
		
		setTimeout(function () { game.state.start('sceneHighScores') }, 3000);

	},
	
	inputName: function (score,position) {		
		/*game.add.text(this.game.width / 2 - 140, game.height / 2 - 150, "NEW RECORD!", {
			font: "40px Vector Battle", fill: "#ffffff", align: "center"
		});
		game.add.text(this.game.width / 2 - 100, game.height / 2, position + " - " + score, {
			font: "40px Vector Battle", fill: "#ffffff", align: "center"
		});
		*/
		game.add.text(this.game.width / 2 - 140, 250, "Loading...", {
			font: "60px AndyBold", fill: "#ffffff", align: "center"
		});
		this.setLocalStorageScore(score,position);
		
	}
};