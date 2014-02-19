var GameLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	asteroidSprite: null,
	spaceShipSprite: null,
	
    init:function()
    {
		//Cria o Layer do jogo
		this.layerGame = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);    
	    
		this.asteroidSprite = new AsteroidLayer();
        this.addChild(this.asteroidSprite);
		this.spaceShipSprite = new SpaceShipLayer();
        this.addChild(this.spaceShipSprite);
        
        this.addChild(this.layerGame);
        return true;
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

