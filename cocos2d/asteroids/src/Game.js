 //Variáveis do JOGO
var screen = null;

//Variáveis dos PERSONAGENS DO JOGO
var asteroids = [];
var ship;

//Variáveis dos CONTROLES
var LG = {KEYS: []}; //Verifica se existe alguma tecla pressionada ou não


var GameLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),

	init:function(){
		//Pega o tamanho da tela
	    screen = cc.Director.getInstance().getWinSize();
	    //Cria o Layer do jogo
		this.layerGame = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);    
	
		//Habilita o teclado/touch como controle
		if ('keyboard' in sys.capabilities)
	    	this.setKeyboardEnabled(true);
		else if('touches' in sys.capabilities)
	        this.setTouchEnabled(true);
		
	    //Coloca GameSpriteSheet na memória
	    this.spriteFrameCache.addSpriteFrames("res/spritesheets/GameSpriteSheet.plist", "res/spritesheets/GameSpriteSheet.png");

        //Coloca o SpaceShip.js no jogo
	    this.ship = new SpaceShip();
    	this.layerGame.addChild(this.ship);
	    
        //Coloca o Asteroids.js no jogo
        for(i=0; i<7; i++){
        	this.asteroids = new Asteroid();
        	this.layerGame.addChild(this.asteroids);
        }
        
        this.addChild(this.layerGame);
        this.scheduleUpdate();
        return true;
    },
    
	onKeyDown:function (e) {
        LG.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        LG.KEYS[e] = false;
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
