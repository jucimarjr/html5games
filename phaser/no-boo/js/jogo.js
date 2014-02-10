var Jogo = {};

Jogo = function (game) {
	this.game = game;
};

//Here is a custom game object
Fantasma = function (texture) {
    Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, texture);
    game.add.existing(this);
    
    var direita = false;
    var esquerda = false;
    var cima = false;
    var baixo = false;
};

Fantasma.prototype = Object.create(Phaser.Sprite.prototype);
Fantasma.prototype.constructor = Fantasma;

/**
 * Automatically called by World.update
 */
Fantasma.prototype.update = function() {
	if(this.body.velocity.y>0){
		this.animations.play('baixo')
	}else {
		this.animations.play('cima')
	}
};

var numFantasma = 3;
var numPac = 5;
var grupoFantasmaCinza;
var grupoFantasmaLaranja;
var grupoFantasmaLilas;
var grupoFantasmaVerde;
var grupoFantasmaVermelho;
var grupoPacMan;
var cronometro;
var txt_cronometro;
var pontos = 0;
var crono;
var auxiliar = 1;


Jogo.prototype = {
	preload:function() {
		//preload dos sprites
		game.load.atlas('textures', 'assets/textures_all.png', 'assets/textures_all.json'); 
		game.load.spritesheet('textures_pacman', 'assets/textures_pacman.png', 33, 32);
		game.load.image('coracao_cheio', 'assets/coracao_cheio.png');
		game.load.image('coracao_vazio', 'assets/coracao_vazio.png');
		
		//preload dos audios			
		game.load.audio('clickFantasma1', 'audio/Plop1.wav');
		game.load.audio('clickFantasma2', 'audio/Plop2.wav');
		game.load.audio('clickFantasma3', 'audio/Plop3.wav');
		game.load.audio('clickFantasma4', 'audio/Plop4.wav');
		game.load.audio('clickFantasma5', 'audio/Plop5.wav');
		game.load.audio('clickFantasma6', 'audio/Plop6.wav');
		game.load.audio('clickFantasma7', 'audio/Plop7.wav');
		game.load.audio('clickFantasma8', 'audio/Plop8.wav');
		game.load.audio('clickFantasma9', 'audio/Plop9.wav');
		game.load.audio('clickPacMan', 'audio/Fail.wav');
	},
	
	create:function() {
		//grupo de fantasminhas separados por cor


		//informações sobre a partida
		var txt_pontos;
		var vidas = 3;
		var coracao1, coracao2, coracao3;
		var tamanhoCoracao = 35;
		cronometro = 30;
		if(auxiliar == 1)
			intervalo = 1000;
		else intervalo = 0;
		crono = setInterval(function(){
			auxiliar++;
			ponto = 0;
			numPac = 5;
			numFantasma = 3;
			cronometro--;
			if(cronometro<10){
				txt_cronometro.content = '00:0' + cronometro;
			}else{
				txt_cronometro.content = '00:' + cronometro;
			}
		},1000);
		
		grupoFantasmaCinza = game.add.group();
		grupoFantasmaLaranja = game.add.group();
		grupoFantasmaLilas = game.add.group();
		grupoFantasmaVerde = game.add.group();
		grupoFantasmaVermelho = game.add.group();
		grupoPacMan = game.add.group();

		createFantasma('cinza', grupoFantasmaCinza);
		createFantasma('laranja', grupoFantasmaLaranja);
		createFantasma('lilas', grupoFantasmaLilas);
		createFantasma('verde', grupoFantasmaVerde);
		createFantasma('vermelho', grupoFantasmaVermelho);
		createPacMan();

		txt_pontos = game.add.text(15, 15, 'Pontos: 0', {font: '35px Grinched', fill: '#fff' });
		coracao1 = game.add.sprite(game.world.width/2 - tamanhoCoracao, 15, 'coracao_cheio');
		coracao2 = game.add.sprite(game.world.width/2, 15, 'coracao_cheio');
		coracao3 = game.add.sprite(game.world.width/2 + tamanhoCoracao, 15, 'coracao_cheio');
		txt_cronometro = game.add.text(game.world.width - 95, 15, '00:30', {font: '35px Grinched', fill: '#fff' });
		

		
		var direcao;
		function configurarMovimento(objeto) {
			objeto.anchor.x = 0.5;
			objeto.anchor.y = 0.5;
			
			direcao = game.rnd.integerInRange(0, 360);
			objeto.body.velocity.x = Math.cos(direcao*0.0174)*50;
			objeto.body.velocity.y = Math.sin(direcao*0.0174)*50;
			objeto.body.collideWorldBounds = true;
			objeto.body.bounce.setTo(1, 1);
		}
		
		var fantasma;
		var aleatorio;
	
		function createFantasma(corFantasma, grupoFantasma) {
			for(var i=0;i<numFantasma;i++){
				fantasma = new Fantasma('textures')
				//fantasma = game.add.sprite(game.rnd.integerInRange(0, 640), game.rnd.integerInRange(0, 480), 'textures');
				fantasma.inputEnabled=true;
				configurarMovimento(fantasma);
				grupoFantasma.add(fantasma);				
				
				//Cria um fantasminha de acordo com a direção aleatória escolhida pra ele (com a seu respectiva troca de perninhas)
				//x > 0 = direita; x < 0 = esquerda
				//y > 0 = baixo; y < 0 = cima;
				if (Math.abs(fantasma.body.velocity.x) > Math.abs(fantasma.body.velocity.y)) {
					if (fantasma.body.velocity.x > 0) {
						fantasma.direita = true;
						fantasma.animations.add('direita', Phaser.Animation.generateFrameNames(corFantasma + '_direita', 3, 4, '.png'));
						fantasma.animations.play('direita', 8, true);
					} else {
						fantasma.esquerda = true;
						fantasma.animations.add('esquerda', Phaser.Animation.generateFrameNames(corFantasma + '_esquerda', 3, 4, '.png'));
						fantasma.animations.play('esquerda', 8, true);					
					}
				} else {
					if (fantasma.body.velocity.y > 0) {
						fantasma.baixo = true;
						fantasma.animations.add('baixo', Phaser.Animation.generateFrameNames(corFantasma + '_baixo', 3, 4, '.png'));
						fantasma.animations.play('baixo', 8, true);	
					} else {
						fantasma.cima = true;
						fantasma.animations.add('cima', Phaser.Animation.generateFrameNames(corFantasma + '_cima', 3, 4, '.png'));
						fantasma.animations.play('cima', 8, true);						
					}	
				}
			
				fantasma.events.onInputDown.add(elimine = function(fantasma){
					fantasma.destroy();

					if (musica.isPlaying) {
						var somFantasma = game.add.audio('clickFantasma'+game.rnd.integerInRange(1, 9));
						somFantasma.play();
					}
					
					var explosao = game.add.sprite(fantasma.x, fantasma.y, 'textures');
					explosao.anchor.x = 0.5;
					explosao.anchor.y = 0.5;
					explosao.animations.add('explode', Phaser.Animation.generateFrameNames('explosao', 1, 10, '.png'), 8, false);
					explosao.animations.play('explode', 30, false, true);

					pontuar();
				},null);
			}
		}

		var textures_pacman;
		function createPacMan() {
			for(var i=0;i<numPac;i++){
				textures_pacman = game.add.sprite(game.rnd.integerInRange(0, 620), game.rnd.integerInRange(0, 460), 'textures_pacman')
				textures_pacman.inputEnabled=true;

				//Abrir e fechar boca
				textures_pacman.animations.add('mover', [2,3]);
				textures_pacman.animations.play('mover', 8, true);

				configurarMovimento(textures_pacman);
				
				textures_pacman.events.onInputDown.add(elimine = function(pac){
					if (musica.isPlaying) {
						var somPacMan = game.add.audio('clickPacMan', 0.2);
						somPacMan.play();
					}
					
					pac.animations.add('fail', [0,3,1,2,0,3,1,2,0,3,1,2]);
					pac.animations.play('fail', 15, false);

					setTimeout(function(){
						pac.animations.add('mover', [2,3]);
						pac.play('mover', 8, true);}, 800);

					perderVida();
				},null);
				
				grupoPacMan.add(textures_pacman);
			}
		}

		function pontuar () {
			//Acrescenta 1 ponto a cada fantasminha atinjido
			pontos += 1;
		    txt_pontos.content = 'Pontos: ' + pontos;
		    /*
		    if (pontos == 15) {
		    	//sai do Jogo e vai pra tela de Ganhou
				setTimeout(function(){
					game.state.start('ganhou', Ganhou);
				}, 700);
		    }
		    */
		}

		function perderVida () {
			//Diminui 1 vida a cada pac-man atingido
			switch (vidas) {
				case 3:
					coracao3.destroy();
					coracao3 = game.add.sprite(game.world.width/2 + tamanhoCoracao, 15, 'coracao_vazio');
					break;
				case 2:
					coracao2.destroy();
					coracao2 = game.add.sprite(game.world.width/2, 15, 'coracao_vazio');
					break;
				case 1:
					coracao1.destroy();
					coracao1 = game.add.sprite(game.world.width/2 - tamanhoCoracao, 15, 'coracao_vazio');
					//sai do Jogo e vai pra tela de Perdeu
					setTimeout(function(){
						game.state.start('perdeu', Perdeu);
					}, 700);
					break;
			}
			vidas -= 1;
		}
	},
	update:function(){
        if (cronometro <= 0) {
            //sai do Jogo e vai pra tela de Perdeu
        	//clearInterval(crono);
            setTimeout(function(){
                game.state.start('perdeu', Perdeu);
            }, 700);
        }
		grupoFantasmaCinza.forEachAlive(function(fantasma){
			if (Math.abs(fantasma.body.velocity.x) > Math.abs(fantasma.body.velocity.y)) {
				if (fantasma.body.velocity.x > 0) {
					if(!fantasma.direita){
						fantasma.animations.add('direita', Phaser.Animation.generateFrameNames('cinza_direita', 3, 4, '.png'));
						fantasma.animations.play('direita', 8, true);
						fantasma.esquerda = false;
						fantasma.cima = false;
						fantasma.baixo = false;
						fantasma.direita = true;
					}
				}else {
					if(!fantasma.esquerda){
						fantasma.animations.add('esquerda', Phaser.Animation.generateFrameNames('cinza_esquerda', 3, 4, '.png'));
						fantasma.animations.play('esquerda', 8, true);	
						fantasma.direita = false;
						fantasma.cima = false;
						fantasma.baixo = false;	
						fantasma.esquerda = true;
					}	
				}
			} else {
				if (fantasma.body.velocity.y > 0) {
					if(!fantasma.baixo){
						fantasma.animations.add('baixo', Phaser.Animation.generateFrameNames('cinza_baixo', 3, 4, '.png'));
						fantasma.animations.play('baixo', 8, true);	
						fantasma.esquerda = false;
						fantasma.cima = false;
						fantasma.direita = false;
						fantasma.baixo = true
					}
				} else {
					if(!fantasma.cima){
						fantasma.animations.add('cima', Phaser.Animation.generateFrameNames('cinza_cima', 3, 4, '.png'));
						fantasma.animations.play('cima', 8, true);
						fantasma.esquerda = false;
						fantasma.direita = false;
						fantasma.baixo = false;
						fantasma.cima = true;
					}
				}	
			}
		}, this);
		grupoFantasmaLaranja.forEachAlive(function(fantasma){
			if (Math.abs(fantasma.body.velocity.x) > Math.abs(fantasma.body.velocity.y)) {
				if (fantasma.body.velocity.x > 0) {
					if(!fantasma.direita){
						fantasma.animations.add('direita', Phaser.Animation.generateFrameNames('laranja_direita', 3, 4, '.png'));
						fantasma.animations.play('direita', 8, true);
						fantasma.esquerda = false;
						fantasma.cima = false;
						fantasma.baixo = false;
						fantasma.direita = true;
					}
				}else {
					if(!fantasma.esquerda){
						fantasma.animations.add('esquerda', Phaser.Animation.generateFrameNames('laranja_esquerda', 3, 4, '.png'));
						fantasma.animations.play('esquerda', 8, true);	
						fantasma.direita = false;
						fantasma.cima = false;
						fantasma.baixo = false;	
						fantasma.esquerda = true;
					}	
				}
			} else {
				if (fantasma.body.velocity.y > 0) {
					if(!fantasma.baixo){
						fantasma.animations.add('baixo', Phaser.Animation.generateFrameNames('laranja_baixo', 3, 4, '.png'));
						fantasma.animations.play('baixo', 8, true);	
						fantasma.esquerda = false;
						fantasma.cima = false;
						fantasma.direita = false;
						fantasma.baixo = true
					}
				} else {
					if(!fantasma.cima){
						fantasma.animations.add('cima', Phaser.Animation.generateFrameNames('laranja_cima', 3, 4, '.png'));
						fantasma.animations.play('cima', 8, true);
						fantasma.esquerda = false;
						fantasma.direita = false;
						fantasma.baixo = false;
						fantasma.cima = true;
					}
				}	
			}
		}, this);
		grupoFantasmaLilas.forEachAlive(function(fantasma){
			if (Math.abs(fantasma.body.velocity.x) > Math.abs(fantasma.body.velocity.y)) {
				if (fantasma.body.velocity.x > 0) {
					if(!fantasma.direita){
						fantasma.animations.add('direita', Phaser.Animation.generateFrameNames('lilas_direita', 3, 4, '.png'));
						fantasma.animations.play('direita', 8, true);
						fantasma.esquerda = false;
						fantasma.cima = false;
						fantasma.baixo = false;
						fantasma.direita = true;
					}
				}else {
					if(!fantasma.esquerda){
						fantasma.animations.add('esquerda', Phaser.Animation.generateFrameNames('lilas_esquerda', 3, 4, '.png'));
						fantasma.animations.play('esquerda', 8, true);	
						fantasma.direita = false;
						fantasma.cima = false;
						fantasma.baixo = false;	
						fantasma.esquerda = true;
					}	
				}
			} else {
				if (fantasma.body.velocity.y > 0) {
					if(!fantasma.baixo){
						fantasma.animations.add('baixo', Phaser.Animation.generateFrameNames('lilas_baixo', 3, 4, '.png'));
						fantasma.animations.play('baixo', 8, true);	
						fantasma.esquerda = false;
						fantasma.cima = false;
						fantasma.direita = false;
						fantasma.baixo = true
					}
				} else {
					if(!fantasma.cima){
						fantasma.animations.add('cima', Phaser.Animation.generateFrameNames('lilas_cima', 3, 4, '.png'));
						fantasma.animations.play('cima', 8, true);
						fantasma.esquerda = false;
						fantasma.direita = false;
						fantasma.baixo = false;
						fantasma.cima = true;
					}
				}	
			}
		}, this);
		grupoFantasmaVerde.forEachAlive(function(fantasma){
			if (Math.abs(fantasma.body.velocity.x) > Math.abs(fantasma.body.velocity.y)) {
				if (fantasma.body.velocity.x > 0) {
					if(!fantasma.direita){
						fantasma.animations.add('direita', Phaser.Animation.generateFrameNames('verde_direita', 3, 4, '.png'));
						fantasma.animations.play('direita', 8, true);
						fantasma.esquerda = false;
						fantasma.cima = false;
						fantasma.baixo = false;
						fantasma.direita = true;
					}
				}else {
					if(!fantasma.esquerda){
						fantasma.animations.add('esquerda', Phaser.Animation.generateFrameNames('verde_esquerda', 3, 4, '.png'));
						fantasma.animations.play('esquerda', 8, true);	
						fantasma.direita = false;
						fantasma.cima = false;
						fantasma.baixo = false;	
						fantasma.esquerda = true;
					}	
				}
			} else {
				if (fantasma.body.velocity.y > 0) {
					if(!fantasma.baixo){
						fantasma.animations.add('baixo', Phaser.Animation.generateFrameNames('verde_baixo', 3, 4, '.png'));
						fantasma.animations.play('baixo', 8, true);	
						fantasma.esquerda = false;
						fantasma.cima = false;
						fantasma.direita = false;
						fantasma.baixo = true
					}
				} else {
					if(!fantasma.cima){
						fantasma.animations.add('cima', Phaser.Animation.generateFrameNames('verde_cima', 3, 4, '.png'));
						fantasma.animations.play('cima', 8, true);
						fantasma.esquerda = false;
						fantasma.direita = false;
						fantasma.baixo = false;
						fantasma.cima = true;
					}
				}	
			}
		}, this);
		grupoFantasmaVermelho.forEachAlive(function(fantasma){
			if (Math.abs(fantasma.body.velocity.x) > Math.abs(fantasma.body.velocity.y)) {
				if (fantasma.body.velocity.x > 0) {
					if(!fantasma.direita){
						fantasma.animations.add('direita', Phaser.Animation.generateFrameNames('vermelho_direita', 3, 4, '.png'));
						fantasma.animations.play('direita', 8, true);
						fantasma.esquerda = false;
						fantasma.cima = false;
						fantasma.baixo = false;
						fantasma.direita = true;
					}
				}else {
					if(!fantasma.esquerda){
						fantasma.animations.add('esquerda', Phaser.Animation.generateFrameNames('vermelho_esquerda', 3, 4, '.png'));
						fantasma.animations.play('esquerda', 8, true);	
						fantasma.direita = false;
						fantasma.cima = false;
						fantasma.baixo = false;	
						fantasma.esquerda = true;
					}	
				}
			} else {
				if (fantasma.body.velocity.y > 0) {
					if(!fantasma.baixo){
						fantasma.animations.add('baixo', Phaser.Animation.generateFrameNames('vermelho_baixo', 3, 4, '.png'));
						fantasma.animations.play('baixo', 8, true);	
						fantasma.esquerda = false;
						fantasma.cima = false;
						fantasma.direita = false;
						fantasma.baixo = true
					}
				} else {
					if(!fantasma.cima){
						fantasma.animations.add('cima', Phaser.Animation.generateFrameNames('vermelho_cima', 3, 4, '.png'));
						fantasma.animations.play('cima', 8, true);
						fantasma.esquerda = false;
						fantasma.direita = false;
						fantasma.baixo = false;
						fantasma.cima = true;
					}
				}	
			}
		}, this);
		grupoPacMan.forEachAlive(function(pac){
			if (Math.abs(pac.body.velocity.x) > Math.abs(pac.body.velocity.y)) {
				if (pac.body.velocity.x > 0) {
					pac.angle = 0;
				} else {
					pac.angle = 180;
				}
			} else {
				if (pac.body.velocity.y > 0) {
					pac.angle = 90;
				} else {
					pac.angle = 270;
				}	
			}
		});
		if(pontos >= numFantasma*5){
			//clearInterval(crono);
			pontos = 0;
			numFantasma++;
			numPac = numPac + 3;
			game.state.start('ganhou', Ganhou);
		}
	}	
};
