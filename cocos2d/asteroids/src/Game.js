 //Variáveis do JOGO
var screen = null;
var layer = null;

var numberLives = 3;
var spriteLives = [];
var gameOver = null;

var scoreGame = {
	scoreLabel: null, 
	score: 0
};

//Variáveis dos CONTROLES
var LG = {KEYS: []}; //Verifica se existe alguma tecla pressionada ou não

//Variáveis dos PERSONAGENS DO JOGO
var asteroids = [];
var ship = null;
var ufo = null;


var GameLayer = cc.Layer.extend({
	//Variáveis de SPRITES E ANIMAÇÕES
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	
	numberAsteroids: 7,
	
	
	init:function(){
		verify = true;
		//Habilita o teclado/touch como controle
		if ('keyboard' in sys.capabilities)
	    	this.setKeyboardEnabled(true);
		else if('touches' in sys.capabilities)
	        this.setTouchEnabled(true);
		
		//Pega o tamanho da tela
	    screen = cc.Director.getInstance().getWinSize();
	    //Cria o Layer do jogo
		layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);    
	
		numberLives = 3;
		// Coloca as vidas na tela
		this.addLives();
		// Coloca os pontos na tela
		this.addScore();
		
	    //Coloca GameSpriteSheet na memória
	    this.spriteFrameCache.addSpriteFrames("res/spritesheets/GameSpriteSheet.plist", "res/spritesheets/GameSpriteSheet.png");

        //Coloca o Asteroids.js no jogo (sendo que o jogo é iniciado apenas com asteroids grandes)
        for(i=0; i<this.numberAsteroids; i++)
        	asteroids.push(new Asteroid("big", 0));
        
        //Coloca o SpaceShip.js no jogo
	    ship = new SpaceShip();
	    
	    //Coloca o UFO.js no jogo
	    ufo = new UFO();
    	
        this.addChild(layer);
        this.scheduleUpdate();
		
		cc.AudioEngine.getInstance().playMusic("res/audios/AsteroidsTonehi.mp3", true);
		
        return true;
    },
	
	update:function(){
//    	scoreGame.scoreLabel.setString(scoreGame.score);    	
	},
    
	onKeyDown:function (e) {
        LG.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        LG.KEYS[e] = false;
    },

    
    addScore:function(){
		scoreGame.scoreLabel = cc.LabelTTF.create(scoreGame.score, "VectorB", 20);
		scoreGame.scoreLabel.setColor(new cc.Color3B(255, 255, 255));
		scoreGame.scoreLabel.setPosition(new cc.Point(screen.width - 40, screen.height - 40) );
		layer.addChild(scoreGame.scoreLabel);	
    },
    
    addLives:function(){
    	count = 0;
    	for(var i=0; i<numberLives; i++) {
    		spriteLives[i] = cc.Sprite.create("res/images/ship_14-24.png");
            spriteLives[i].setPosition(30 + count, screen.height - 30);
            layer.addChild(spriteLives[i]);
            count = count + 14;
        }
    },
	
	removeLives:function(numberLives){
		layer.removeChild(spriteLives[numberLives]);		
		if (numberLives == 0){
		//	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new Losing()));
		
			gameOver = cc.LabelTTF.create("GAME OVER", "SFAtarianSystem", 100);
			gameOver.setColor(new cc.Color3B(255, 255, 255));
	        gameOver.setPosition(new cc.Point(screen.width/2, screen.height/2) );
	        layer.addChild(gameOver);
		}
	},
	
	initAsteroids:function(){
		this.spriteFrameCache.addSpriteFrames("res/spritesheets/GameSpriteSheet.plist", "res/spritesheets/GameSpriteSheet.png");
		screen = cc.Director.getInstance().getWinSize();
		layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);    		
		//Coloca o Asteroids.js no jogo (sendo que o jogo é iniciado apenas com asteroids grandes)
        for(i=0; i<this.numberAsteroids; i++)
        	asteroids.push(new Asteroid("big", 0));
		this.addChild(layer);
	}
});

var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});
