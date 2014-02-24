HighScoreInput = function (game) {
    this.game = game;
};

HighScoreInput.prototype.create = function () {
    
    var scorePosition = this.verifyScore( this.game.score );

    if (scorePosition != 0)
        this.inputName(this.game.score,scorePosition);
    else
        this.game.state.start('HighScore', HighScore);

};

HighScoreInput.prototype.verifyScore = function (score) {

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

};

HighScoreInput.prototype.inputName = function (score,position) {

    game.add.text(this.game.width / 2 - 140, this.game.height / 2 - 150, "NEW RECORD!", {
        font: "40px Vector Battle", fill: "#ffffff", align: "center"
    });
    game.add.text(this.game.width / 2 - 100, this.game.height / 2, position + " - " + score, {
        font: "40px Vector Battle", fill: "#ffffff", align: "center"
    });

    localStorage["score" + position] = score;
    localStorage["nameScore" + position] = "AAA";

    setTimeout(function () { game.state.start('HighScore', HighScore) } , 3000 );

};