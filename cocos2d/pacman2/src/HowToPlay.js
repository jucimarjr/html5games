var howToPlayLayer = cc.Layer.extend({
	init: function()
	{
		this._super();
		
		if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);
		
		background = cc.Director.getInstance().getWinSizeInPixels();
		
		this.title = cc.Sprite.create(sMenuTitle);
		this.title.setPosition(new cc.Point(background.width/2, background.height - 70) );
        this.addChild(this.title);
        
        this.line1 = cc.LabelTTF.create("Use the arrow keys to move,", 
        		"fontName", background.width/30);
        this.line1 .setColor( new cc.Color3B(255, 255, 51) );
        this.line1.setPosition(new cc.Point(background.width/2, background.height - 220));
        this.addChild(this.line1);
        
        this.line2 = cc.LabelTTF.create("avoid the ghosts.", 
        		"fontName", background.width/30);
        this.line2 .setColor( new cc.Color3B(255, 255, 51) );
        this.line2.setPosition(new cc.Point(background.width/2, background.height - 250));
        this.addChild(this.line2);
        
        this.line3 = cc.LabelTTF.create("Some of the ghosts move faster than others.", 
        		"fontName", background.width/30);
        this.line3 .setColor( new cc.Color3B(255, 255, 51) );
        this.line3.setPosition(new cc.Point(background.width/2, background.height - 280));
        this.addChild(this.line3);
        
        this.line4 = cc.LabelTTF.create("Each ghost has different rules", 
        		"fontName", background.width/30);
        this.line4 .setColor( new cc.Color3B(255, 255, 51) );
        this.line4.setPosition(new cc.Point(background.width/2, background.height - 310));
        this.addChild(this.line4);
        
        this.line5 = cc.LabelTTF.create("for how they track you.", 
        		"fontName", background.width/30);
        this.line5 .setColor( new cc.Color3B(255, 255, 51) );
        this.line5.setPosition(new cc.Point(background.width/2, background.height - 340));
        this.addChild(this.line5);
        
        this.back = cc.LabelTTF.create("BACK?", "fontName", background.width/30);
        this.back.setPosition(new cc.Point(background.width/2, background.height - 420));
        this.addChild(this.back);
	},
	
	onMouseUp: function (event) {
        this.backMenu();
    },
    
    backMenu: function (dt) {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.0, new menu()));
    }
});

var howToPlay = cc.Scene.extend({
	onEnter: function()
	{
		this._super();
		var layer = new howToPlayLayer();
		layer.init();
		this.addChild(layer);
	}
});