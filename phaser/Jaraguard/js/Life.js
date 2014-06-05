var Life = {};
Life = function() {

};
var lives;
var liveText;

Life.prototype.create = function() {
    lives = 50;
    liveText = game.add.text(game.camera.x + 280, game.camera.y + 6, ' x ' + lives, {font: '34px Arial', fill: '#fff'});
    liveText.fixedToCamera = true;
};

Life.prototype.getVida = function() {
    return lives;
};

Life.prototype.setVida = function(live) {
    lives = live;
};


Life.prototype.controleVidas = function() {
    lives -= 1;
    liveText.text = ' x ' + lives;
};

Life.prototype.posicionaLife = function() {
    //posicao das vidas alinhado  ao score 
    liveText.x = game.camera.x + 280;
    liveText.y = game.camera.y + 6;

};