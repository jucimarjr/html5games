/**
 * 
 */
Game = function(game){
	this.game = game;
	
} ;
spaceShip = null;
Game.prototype.create = function(){
	spaceShip = new Nave(this.game);
};
Game.prototype.update = function(){
	spaceShip.update();
};
