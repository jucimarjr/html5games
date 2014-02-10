var Menu = {};

Menu = function (game, musica) {
	this.game = game;
	this.musica = musica;
};

Menu.prototype = {
	preload:function() {
		//preload da tela de Menu
		game.load.image('tela_menu', 'assets/telas/2. menu.png');
		//preload dos botões do Menu
		game.load.spritesheet('botoes', 'assets/telas/botoes/botoes.png', 189, 52);
		game.load.image('som', 'assets/telas/botoes/som.png', 189, 52);
		game.load.image('som_desligado', 'assets/telas/botoes/som_desligado.png', 189, 52);
	},

	create:function() {
		var fundo = game.add.sprite(0, 0, 'tela_menu');
		var fadeout;
		
		var btn_som = game.add.sprite(game.world.width - 50, 15, 'som');
		btn_som.inputEnabled=true;
		btn_som.events.onInputDown.add(controle = function(btn_som){
			if (musica.isPlaying) {
				btn_som.loadTexture('som_desligado'); 
				musica.pause();
			}
			else {
				btn_som.loadTexture('som');
				musica.resume();;
			}
		},null);
		
		var btn_jogar = game.add.button(game.world.centerX + 15, game.world.centerY - 75, 'botoes',
		function(){ ir_jogar(); }, null, 0, 3);
		btn_jogar.anchor.x = 0.5;
		
		function ir_jogar() {
			encerrar_tela();
			fadeout.onComplete.add(function(){
				//sai do Menu e vai pra tela de Jogo
				game.state.start('jogo', Jogo);
			});
		}
		
		
		var btn_instrucoes = game.add.button(game.world.centerX + 15, game.world.centerY - 15, 'botoes',
		function(){ ir_instrucoes(); }, null, 2, 5);
		btn_instrucoes.anchor.x = 0.5;
		
		function ir_instrucoes() {
			encerrar_tela();
			fadeout.onComplete.add(function(){
				//sai do Menu e vai pra tela de Instruções
				game.state.start('instrucoes', Instrucoes);
			});
		}

		
		var btn_creditos = game.add.button(game.world.centerX + 15, game.world.centerY + 45, 'botoes',
		function(){ ir_creditos(); }, null, 1, 4);
		btn_creditos.anchor.x = 0.5;
		
		function ir_creditos() {
			encerrar_tela();
			fadeout.onComplete.add(function(){
				//sai do Menu e vai pra tela de Créditos
				game.state.start('creditos', Creditos);
			});
		}


		function encerrar_tela() {
			fadeout = game.add.tween(fundo).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout = game.add.tween(btn_jogar).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout = game.add.tween(btn_instrucoes).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
			fadeout = game.add.tween(btn_creditos).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
		}
	}
};
