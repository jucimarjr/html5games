State.Game = function(game){};
State.Game.prototype.preload = function(){
	game.load.image('game-background', Config.dirGameBackground);
	game.load.spritesheet('hero', Config.dirHero, 30, 60);
};