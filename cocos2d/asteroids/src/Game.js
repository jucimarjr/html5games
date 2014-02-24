 //Vari�veis do JOGO
var screen = null;
var layer = null;

var scoreGame = {
	scoreLabel: null, 
	score: 0
};

//Vari�veis dos CONTROLES
var LG = {KEYS: []}; //Verifica se existe alguma tecla pressionada ou n�o

//Vari�veis dos PERSONAGENS DO JOGO
var asteroids = [];
var ship = null;


var GameLayer = cc.Layer.extend({
	//Vari�veis de SPRITES E ANIMA��ES
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	
	numberAsteroids: 7,
	
	
	init:function(){
		//Habilita o teclado/touch como controle
		if ('keyboard' in sys.capabilities)
	    	this.setKeyboardEnabled(true);
		else if('touches' in sys.capabilities)
	        this.setTouchEnabled(true);
		
		//Pega o tamanho da tela
	    screen = cc.Director.getInstance().getWinSize();
	    //Cria o Layer do jogo
		layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);    
	
		// Coloca as vidas na tela
		this.addLives();
		// Coloca os pontos na tela
		this.addScore();
		
	    //Coloca GameSpriteSheet na mem�ria
	    this.spriteFrameCache.addSpriteFrames("res/spritesheets/GameSpriteSheet.plist", "res/spritesheets/GameSpriteSheet.png");

        //Coloca o Asteroids.js no jogo (sendo que o jogo � iniciado apenas com asteroids grandes)
        for(i=0; i<this.numberAsteroids; i++)
        	asteroids.push(new Asteroid("big", 0));
        
        //Coloca o SpaceShip.js no jogo
	    this.ship = new SpaceShip();
    	
        this.addChild(layer);
        this.scheduleUpdate();
        return true;
    },
    
	update:function(){
    	this.collideAsteroidWithSpace();
	},
    
	onKeyDown:function (e) {
        LG.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        LG.KEYS[e] = false;
    },

    
    collideAsteroidWithSpace:function(){
    	for(var i=0; i<asteroids.length; i++){
    		if(this.collide(asteroids[i], this.ship)){
    			asteroids[i].die(asteroids[i].getPosition());
    			asteroids.splice(i, 1); //Remove 1 elemento no index i
				this.ship.die();
			}
	    }	
    },
    
    //Verifica se h� uma colis�o
    collide:function(object1, object2){
        var object1Rect = object1.collideRect(object1.getPosition());
        var object2Rect = object2.collideRect(object2.getPosition());
        
        return cc.rectIntersectsRect(object1Rect, object2Rect);
    },
    
    addLives:function(){
    	count = 0;
    	for(var i=0; i<3; i++) {
    		this.spriteShip = cc.Sprite.create("res/images/ship_14-24.png");
            this.spriteShip.setPosition(30 + count, screen.height - 30);
            layer.addChild(this.spriteShip);
            count = count + 14;
        }
    },
        
    addScore:function(){
		scoreGame.scoreLabel = cc.LabelTTF.create(scoreGame.score, "VectorB", 20);
		scoreGame.scoreLabel.setColor( new cc.Color3B(255, 255, 255) );
		scoreGame.scoreLabel.setPosition(new cc.Point(screen.width - 40, screen.height - 40) );
		layer.addChild(scoreGame.scoreLabel);	
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
