var g_sharedGameLayer;

var GameLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	asteroidSprite: null,
	spaceShipSprite: null,
	_ship,
	
    init:function()
    {
		//Cria o Layer do jogo
		this.g_sharedGameLayer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);    
	    
		//this.asteroidSprite = new AsteroidLayer();
        //this.addChild(this.asteroidSprite);
		//this.spaceShipSprite = new SpaceShipLayer();
        //this.addChild(this.spaceShipSprite);
		
		if (sys.capabilities.hasOwnProperty('keyboard'))
        this.setKeyboardEnabled(true);

        
        this.addChild(this.g_sharedGameLayer);
        return true;
    },
	onKeyDown:function (e) {
        MW.KEYS[e] = true;
    },
    onKeyUp:function (e) {
        MW.KEYS[e] = false;
    },
});

var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});

