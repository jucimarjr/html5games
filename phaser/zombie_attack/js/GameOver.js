GameOver = function (game) {
    this.game = game;
    this.background = null;
    this.lastScoreText;
	this.lastRoundText;
	this.bestScoreText;
	this.bestRoundText;
	this.btnBack = null;
	this.fadeout;
};

GameOver.prototype.create = function()
{
	this.background = this.game.add.sprite(0, 0,'gameOverScreen');
	window.localStorage.setItem("lastScore", game.lastScore);
	window.localStorage.setItem("lastRound", game.lastRound);
	console.log("bestScore "+game.bestScore);
	
	if(typeof game.bestScore === 'undefined')
	{
		game.bestScore = 0;
		game.BestRound = 1;
	}
	
	if(game.lastScore > game.bestScore)
	{
		console.log("bestScore "+game.bestScore);
		game.bestScore = game.lastScore;
		game.bestRound = game.lastRound;
		window.localStorage.setItem("bestScore", game.lastScore);
		window.localStorage.setItem("bestRound", game.lastRound);
	}
	
	this.lastScoreText = this.game.add.text(440, 173 , game.lastScore,{ font: "24px arcade_normalregular", fill: "#ffffff", align: "right" });
	this.lastRoundText = this.game.add.text(440, 218 , game.lastRound,{ font: "24px arcade_normalregular", fill: "#ffffff", align: "right" });
	this.bestScoreText = this.game.add.text(425, 368 , game.bestScore,{ font: "27px arcade_normalregular", fill: "#ffffff", align: "right" });
	this.bestRoundText = this.game.add.text(425, 435 , game.bestRound,{ font: "27px arcade_normalregular", fill: "#ffffff", align: "right" });
	
	this.btnBack = game.add.button(680, 440, 'buttons',
    	    function(){ this.goMenu(); }, this);
    	    this.btnBack.setFrames(btVoltar,btVoltar);
    	    this.btnBack.anchor.x = 0.5;
};

GameOver.prototype.goMenu = function()
{
	console.log("goMenu");
	this.fadeout = game.add.tween(this.btnBack).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
	this.fadeout.onComplete.add(function () 
			{
				
				this.game.state.start('menu', Menu);
			},this);
};
