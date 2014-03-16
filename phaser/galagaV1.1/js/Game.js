var screen = null;
var layer = null;

var numberLives = 3;

var LG = {KEYS:[]};

var ship = null;

var particle = null; 

var particles = [];

var GameLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	sprite:null,
	background:null,
	//animeCache: cc.AnimationCache.getInstance(),
	
	init:function(){
		
		if ('keyboard' in sys.capabilities)
	    	this.setKeyboardEnabled(true);
		
		screen = cc.Director.getInstance().getWinSize();
		
		//layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 480,600);
		//this.sprite.setScale(0.5);
		layer = cc.Sprite.create("res/screenshoots/Game_480-600.png");
		layer.setPosition(cc.p(screen.width / 2, screen.height / 2));
        this.scheduleUpdate();
		//this.spriteFrameCache.addSpriteFrames("res/spritesheets/ship.plist", "res/spritesheets/ship.png");
		
		//ship = new Ship();
		//background = new Background();
        particle = new Particle(0);
        
        //particles.push(new Particle(2));
		this.addChild(layer);
		
	},
	
	update:function(){
		//var tipo = Math.random()*3;
		//particles.push(new Particle(tipo));
	},
	
	onKeyDown:function (e) {
        LG.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        LG.KEYS[e] = false;
    },
});

var Game = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});

