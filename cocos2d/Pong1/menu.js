menuLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        
                
        var title = cc.Sprite.create("assets/TITLE.png");
        title.setPosition(400, 400);
        this.addChild(title);
        
        
        var btplayer1 = cc.Sprite.create("assets/btStart1.png");
        var btplayer2 = cc.Sprite.create("assets/btStart2.png");
        var btcredits = cc.Sprite.create("assets/btCredits.png");
        var btcontrols = cc.Sprite.create("assets/btControls.png");
        
        
        
        var play1 = cc.MenuItemSprite.create(btplayer1, null,null, 'onStart1', this);
        var play2 = cc.MenuItemSprite.create(btplayer2, null,null, 'onStart2', this);
        play2.setPositionY(-50);
        var credits = cc.MenuItemSprite.create(btcredits, null,null, 'onCredits', this);
        credits.setPositionY(-100);
        var controls = cc.MenuItemSprite.create(btcontrols, null,null, 'onControls', this);
        controls.setPositionY(-150);
        
        var menu = cc.Menu.create(play1, play2, credits, controls);
        menu.setPosition(400, 250);
        this.addChild(menu);
        
        return this;
    },
    onStart1:function(){
    	players = 1;
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new game()));
    },
    onStart2:function(){
    	players = 2;
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
    	var bg = new gameLayer();
    	var layer = new menuLayer();
    	bg.init(true, 0);
    	layer.init();
    	this.addChild(bg);
    	this.addChild(layer);
	}
});