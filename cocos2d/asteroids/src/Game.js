//Variáveis do JOGO
var screen = null;
var timeLabel = null;
var gameTime = null;
var LG = {KEYS: []};
    
//var RIGHT_WALL = 1;
//var LEFT_WALL = 2;
//var UP_WALL = 3;
//var DOWN_WALL = 4;

//var TIPO_VERDE = 1;
//var TIPO_VERMELHO = 2;
//var TIPO_LARANJA = 3;
//var TIPO_LILAS = 4;
//var TIPO_CINZA = 5;
//var TIPO_PACMAN = 6;

//var WIN = 1;
//var LOSE = 2;

//Variáveis do BOX2D

//var world = null;
//var PTM_RATIO = 32.0;

/*var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Listener = Box2D.Dynamics.b2ContactListener;*/

var OBJECTS_GROUP = -1;
var WALLS_GROUP = -2;
var layerGame;
/*************************************************************************************************************************************/
//Inicia o Layer do Jogo
/*************************************************************************************************************************************/


var GameLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	asteroidSprite: null,
	spaceShipSprite: null,
	_ship: null,
	_state:true,
	
    init:function()
    {
		//Cria o Layer do jogo
		screen = cc.Director.getInstance().getWinSizeInPixels();
		
		this.spriteFrameCache.addSpriteFrames("res/spritesheets/GameSpriteSheet.plist", "res/spritesheets/GameSpriteSheet.png");
		
		layerGame = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480); 
		if (sys.capabilities.hasOwnProperty('keyboard'))
			this.setKeyboardEnabled(true);
		
				
		
		for(i=0; i<7; i++){
        	this.asteroides = new Asteroid();
        	this.asteroides.initBigAsteroid();
        	this.addChild(this.asteroides);
        }
		
		//g_sharedGameLayer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);;
		
		this._ship = new Ship();
		this.addChild(this._ship);
		
		
		layerGame = this;
		
		
        
        
        return true;
    },
	onKeyDown:function (e) {
        LG.KEYS[e] = true;
    },
    onKeyUp:function (e) {
        LG.KEYS[e] = false;
    },
	update:function (dt) {
        if (this._state == true) {
            //this.checkIsCollide();
            //this.removeInactiveUnit(dt);
            //this.checkIsReborn();
            //this.updateUI();
        }
    },
	processEvent:function (event) {
        if (this._state == STATE_PLAYING) {
            var delta = event.getDelta();
            var curPos = this._ship.getPosition();
            curPos = cc.pAdd(curPos, delta);
            curPos = cc.pClamp(curPos, cc.POINT_ZERO, cc.p(winSize.width, winSize.height));
            this._ship.setPosition(curPos);
        }
    }
});

var Game = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});

