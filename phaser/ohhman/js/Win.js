var Win = {};

Win = function (game) {
    this.menuImage = 'assets/screenshots/win_600-800.png';       
};

Win.prototype.preload = function(){
    game.load.image('win', this.menuImage);    
};

Win.prototype.create = function() {	
	var fundo = game.add.sprite(0, 0, 'win');
	fundo.alpha = 0;
	
	var fadein = game.add.tween(fundo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);	
};