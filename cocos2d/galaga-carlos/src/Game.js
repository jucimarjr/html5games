var screen = null;
var layer = null;

var numberLives = 3;

var LG = {KEYS:[]};

var ship = null;

var GameLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	//animeCache: cc.AnimationCache.getInstance(),
	
	init:function(){
		
		if ('keyboard' in sys.capabilities)
	    	this.setKeyboardEnabled(true);
		
		screen = cc.Director.getInstance().getWinSize();
		
		layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);
		
		//this.spriteFrameCache.addSpriteFrames("res/spritesheets/ship.plist", "res/spritesheets/ship.png");
		
		ship = new Ship();
		
		this.addChild(layer);
		
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

