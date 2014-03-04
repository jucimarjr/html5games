var background = null;
var layer = null;

var menuLayer = cc.Layer.extend({
		
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animCache: cc.AnimationCache.getInstance(),
	
	init: function(){
		this._super();
		this.spriteFrameCache.addSpriteFrames(ssPacsList, ssPacs);		
		
		background = cc.Director.getInstance().getWinSizeInPixels();
		layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);		
		
		this.pac = new Pac();
		this.addChild(this.pac);				
		        
        this.play = cc.LabelTTF.create("PLAY GAME", "fontName", background.width/30);
        this.play.setPosition(new cc.Point(background.width/2, background.height - 400));
        this.addChild(this.play);
                
        this.scheduleUpdate();
        
        this.schedule(this.bringTitle, 1);
	},
	
	bringTitle: function (dt) {
		this.removeChild(this.pac);
		this.title = cc.Sprite.create(sMenuTitle);
		this.title.setPosition(new cc.Point(background.width/2, background.height - 70) );
        this.addChild(this.title);
    }
});

var menu = cc.Scene.extend({
	onEnter: function (){
		this._super();
		var layer = new menuLayer();
		layer.init();
		this.addChild(layer);
	}
});