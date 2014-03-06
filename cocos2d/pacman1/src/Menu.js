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
		
        cc.MenuItemFont.setFontName("fontName");
        
        var menuItemCredits = new cc.MenuItemFont.create("CREDITS","credits",this);
        var menuItemPlay = new cc.MenuItemFont.create("PLAY GAME","play",this);
        var menuItemHowToPlay = new cc.MenuItemFont.create("HOW TO PLAY","howToPlay",this);

        menuItemCredits.setPosition(new cc.Point(background.width/2-200,background.height/2));
        menuItemPlay.setPosition(new cc.Point(background.width/2,background.height/2));
        menuItemHowToPlay.setPosition(new cc.Point(background.width/2+250,background.height/2));

        var menu = cc.Menu.create(menuItemCredits, menuItemPlay, menuItemHowToPlay);
        menu.setPosition(new cc.Point(0,-160));

        this.addChild(menu);
                
        this.scheduleUpdate();
        
        this.schedule(this.bringTitle, 1);
	},
	
	bringTitle: function (dt) {
		this.removeChild(this.pac);
		this.title = cc.Sprite.create(sMenuTitle);
		this.title.setPosition(new cc.Point(background.width/2, background.height - 70) );
        this.addChild(this.title);
    },
    
    credits:function () {
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new credits()));
    },
    
    play:function () {
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new highScore()));
    },
    
    howToPlay:function () {
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new howToPlay()));
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