var Menu = {};

Menu = function (game) {
	this.game = game;
};

Menu.prototype = {
	preload:function() {
		game.stage.backgroundColor = '#111111';
		game.load.atlas('botoes', 'assets/spritesheets/ButtonsSpriteSheet.png', 'assets/spritesheets/ButtonsSpriteSheet.json');
		
	},
	create:function() {
		var fadeout;
		
		var btn_jogar = game.add.button(game.world.centerX + 15, game.world.centerY - 75, 'botoes',
		function(){ ir_jogar(); }, this);
		btn_jogar.setFrames("btnPlay_155-34.png", 'btnPlaySelected_155-34.png');
		btn_jogar.anchor.x = 0.5;
		
		function ir_jogar() {
			encerrar_tela();
			fadeout.onComplete.add(function(){
				this.game.state.start('game', Game);
			});
		}
		
		
		var btn_instrucoes = game.add.button(game.world.centerX + 15, game.world.centerY - 15, 'botoes',
		function(){ ir_instrucoes(); }, this);
		btn_instrucoes.setFrames("btnHowToPlay_381-34.png", "btnHowToPlaySelected_381-34.png");
		btn_instrucoes.anchor.x = 0.5;
		
		function ir_instrucoes() {
			encerrar_tela();
			fadeout.onComplete.add(function(){
				this.game.state.start('HowToPlay', HowToPlay);
			});
		}

		
		var btn_creditos = game.add.button(game.world.centerX + 15, game.world.centerY + 45, 'botoes',
		function(){ /*ir_creditos();*/ }, this);
		btn_creditos.setFrames('btnCredits_256-34.png', "btnCreditsSelected_256-34.png");
		btn_creditos.anchor.x = 0.5;
		
		function ir_creditos() {
			encerrar_tela();
			fadeout.onComplete.add(function(){
				this.game.state.start('credits', Credits);
			});
		}


		function encerrar_tela() {
			fadeout = game.add.tween(btn_jogar).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout = game.add.tween(btn_instrucoes).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout = game.add.tween(btn_creditos).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
		}
	}
	
};
