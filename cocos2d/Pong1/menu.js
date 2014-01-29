menuLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
                
        var title = cc.Sprite.create("assets/TITLE.png");
        title.setPosition(400, 400);
        this.addChild(title);
        
        var btstart = cc.Sprite.create("assets/btStart.png");
        var btcredits = cc.Sprite.create("assets/btCredits.png");
        var btcontrols = cc.Sprite.create("assets/btControls.png");
        
        var start = cc.MenuItemSprite.create(btstart, null,null, 'onStart', this);
        var credits = cc.MenuItemSprite.create(btcredits, null,null, 'onCredits', this);
        credits.setPositionY(-60);
        var controls = cc.MenuItemSprite.create(btcontrols, null,null, 'onControls', this);
        controls.setPositionY(-120);
        
        var menu = cc.Menu.create(start, credits, controls);
        menu.setPosition(400, 270);
        this.addChild(menu);
        
        return this;
    },
    onStart:function(){
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new game()));
    },
    onCredits:function(){
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new credits()));
    },
    onControls:function(){
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new controls()));
    }
});

menu = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var layer = new menuLayer();
    	layer.init();
    	this.addChild(layer);
	}
});