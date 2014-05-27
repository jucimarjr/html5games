var Score = {};
Score = function() {

};
var scoreText;
var score;
var imagePlayerVidas;

Score.prototype.preload = function() {
    game.load.image('playerVidas', 'assets/playerVida.png');
};

Score.prototype.create = function() {

    score = 0;
    scoreText = game.add.text(game.camera.x + 120,  game.camera.y + 6, '' + score, {font: '34px Arial', fill: '#fff'});
    scoreText.fixedToCamera = true;
    imagePlayerVidas = game.add.sprite(game.camera.x + 250, game.camera.y + 10, 'playerVidas');
    imagePlayerVidas.fixedToCamera = true;
    imagePlayerVidas.angle = 0;
    imagePlayerVidas.alpha = 1;
};

Score.prototype.poscionaPontuacao = function() {
    scoreText.x = game.camera.x + 120;
    scoreText.y = game.camera.y + 6;
    //  posiciona imagem da nave 
    imagePlayerVidas.x = game.camera.x + 250;
    imagePlayerVidas.y = game.camera.y + 10;
  //  lifeScene.posicionaLife();
};

Score.prototype.pontuacao = function(pontuacao) {
    score += pontuacao;
    scoreText.text = score;
};

