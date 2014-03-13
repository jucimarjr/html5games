var background = null;
var layer = null;

var menuLayer = cc.Layer.extend({
		
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	_pac: null,
	_blinky: null,
	_pinky: null,
	_inkey: null,
	_clyde: null,
	
	init: function(){
		this._super();
		this.spriteFrameCache.addSpriteFrames(ssGameList, ssGame);		
		
		background = cc.Director.getInstance().getWinSizeInPixels();
		layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);		
		
		/*this.pac = new Pac();
		this.pac.setAnimation("pac", "right", "36-36", 2, "pac");
		this.pac.getAnimation("pac");
		this.addChild(this.pac);*/
		
		
        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        this._pac = new Pac();
        this.addChild(this._pac);
        this._pac.setPosition(new cc.Point(background.width/2 - 350, background.height - 250));
        this._pac.setAnimation("pac", "right", "16-16", 2, "right");        
        this._pac.getAnimation("right");        
        
		this._blinky = new Ghost();
		this._blinky.setGhost("blinky");
        this.addChild(this._blinky);
        this._blinky.setPosition(new cc.Point(background.width/2 - 450, background.height - 250));
        this._blinky.setAnimation("blinky", "right", "16-16", 2, "right");        
        this._blinky.getAnimation("right");        

		this._pinky = new Ghost();
		this._pinky.setGhost("pinky");
        this.addChild(this._pinky);
        this._pinky.setPosition(new cc.Point(background.width/2 - 470, background.height - 250));
        this._pinky.setAnimation("pinky", "right", "16-16", 2, "right");        
        this._pinky.getAnimation("right");
        
        this._inkey = new Ghost();
		this._inkey.setGhost("inkey");
        this.addChild(this._inkey);
        this._inkey.setPosition(new cc.Point(background.width/2 - 490, background.height - 250));
        this._inkey.setAnimation("inkey", "right", "16-16", 2, "right");        
        this._inkey.getAnimation("right");
        
        this._clyde = new Ghost();
		this._clyde.setGhost("clyde");
        this.addChild(this._clyde);
        this._clyde.setPosition(new cc.Point(background.width/2 - 510, background.height - 250));
        this._clyde.setAnimation("clyde", "right", "16-16", 2, "right");        
        this._clyde.getAnimation("right");
        
        
        this.schedule(this.update);
		
		
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
        
        this.schedule(this.bringTitle, 1);
        
	},
	
	update: function()
	{
		this._pac.setDynamicPosition();
		this._blinky.setDynamicPosition();
		this._pinky.setDynamicPosition();
		this._inkey.setDynamicPosition();
		this._clyde.setDynamicPosition();
		
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
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new game()));
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