menuLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        var action1 = cc.TintBy.create(3, 255, 255, 255);
        var action2 = cc.TintBy.create(3, 255, 255, 255);
        
        var title = cc.Sprite.create("assets/game_title.png");
        title.setPosition(400, 400);
        title.setScale(1.5);
        title.runAction(action1);
        this.addChild(title);
        
        
        var btplayer1 = cc.Sprite.create("assets/btStart1.png");
        var btplayer2 = cc.Sprite.create("assets/btStart2.png");
        var btcredits = cc.Sprite.create("assets/btCredits.png");
        var btcontrols = cc.Sprite.create("assets/btControls.png");
        
        
        
        var play1 = cc.MenuItemSprite.create(btplayer1, null,null, 'onStart1', this);
        var play2 = cc.MenuItemSprite.create(btplayer2, null,null, 'onStart2', this);
        play2.setPositionY(-60);
        var credits = cc.MenuItemSprite.create(btcredits, null,null, 'onCredits', this);
        credits.setPositionY(-120);
        var controls = cc.MenuItemSprite.create(btcontrols, null,null, 'onControls', this);
        controls.setPositionY(-180);
        
        var menu = cc.Menu.create(play1, play2, credits, controls);
        menu.setPosition(400, 280);
        menu.runAction(action2);
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

splashLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        var action = cc.TintBy.create(3, 255, 255, 255);
        
        var title = cc.Sprite.create("assets/LOGO1.png");
        title.setPosition(400, 240);
        title.runAction(action);
        this.addChild(title);
                	
        
        return this;
    }
});

menuInit = cc.Scene.extend({
    onEnter:function(){
    	this._super();

        players = 0;
    	
    	var bg = new gameLayer();
    	bg.init(true, 0);
    	this.addChild(bg);

    	var layer = new splashLayer();
    	layer.init();
    	this.addChild(layer);
    	
    	this.scheduleOnce(function(){
    		layer.removeFromParent(true);
    		var menu = new menuLayer();
        	menu.init();
        	this.addChild(menu);
        },5);
    	
    	
    	
	}
});
menu = cc.Scene.extend({
    onEnter:function(){
    	this._super();

        players = 0;
    	var bg = new gameLayer();
    	bg.init(true, 0);
    	this.addChild(bg);

    	var menu = new menuLayer();
        menu.init();
        this.addChild(menu);
    	
    	
    	
	}
});