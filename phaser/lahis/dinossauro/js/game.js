
var dinoSprite, ossos;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

	game.stage.backgroundColor = '#ffffff';
	game.load.spritesheet('dino', 'dinossauro/assets/dinossauro.png', 200,160);
	game.load.image('osso', 'dinossauro/assets/osso.png');

}

function create () {
	
	// CREATE A dino:
	dinoSprite = game.add.sprite(400, 0, 'dino');
	dinoSprite.animations.add('walk',[1,2],6,true);
	dinoSprite.animations.add('jump',[3,4,5],4,true);
	game.physics.enable(dinoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo físico
   
    dinoSprite.body.acceleration.y = 100;
    dinoSprite.body.collideWorldBounds = true; // para no limite inferio da tela
    dinoSprite.body.drag.x = 100; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    dinoSprite.anchor.setTo(.5,.5); // diminui o espaço do deslocamento do espelhamento 
    dinoSprite.body.gravity.y = 150;
    
   
    // CREATE A OSSO GROUP:
    ossos = game.add.group();
    ossos.create( 50, 100, 'osso');
    ossos.create( 50, 200, 'osso');
    ossos.create( 50, 300, 'osso'); 
    game.physics.enable(ossos, Phaser.Physics.ARCADE);
}


function update () {

	// COLISÃO COM OSSO:
	game.physics.arcade.overlap(dinoSprite, ossos, dinoEatosso,null,this);


	// PEGA A ENTRADA (tecla pressionada):	
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda

		dinoSprite.body.velocity.x = -100;
		dinoSprite.animations.play('walk');
		dinoSprite.scale.x = -1; // espelha se antes -1
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita

		dinoSprite.body.velocity.x = 100;
		dinoSprite.scale.x = +1;  // espelha se antes 1
		dinoSprite.animations.play('walk');
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		dinoSprite.body.velocity.y = -100;
		dinoSprite.animations.play('jump');
	}

	else{
	    	dinoSprite.animations.stop();
			dinoSprite.frame = 0;
		}	
}

function dinoEatosso (dino,osso)	{

		osso.kill();
}

