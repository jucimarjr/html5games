var Peca = function(game,posX,posY,l1,l2,sprite){
	Phaser.Sprite.call(this, game, posX, posY, 'pecas',28);
	this.sprite= sprite;
	this.inputEnabled = true;
	this.events.onInputDown.addOnce(this.apear ,this);
	this.lado1 = l1;
	this.lado2 = l2;
	game.add.existing(this);
};

Peca.prototype = Object.create(Phaser.Sprite.prototype);
Peca.prototype.constructor = Peca;

Peca.prototype.apear = function(){
	this.frame = this.sprite;
};