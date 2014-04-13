menuInit = cc.Scene.extend({
    onEnter:function(){
    	this._super();
 
    	var layer = new splashLayer();
    	layer.init();
    	this.addChild(layer);
    	
    	this.scheduleOnce(function(){
    		layer.removeFromParent(true);
    		var menu = new menuLayer();
        	menu.init();
        	this.addChild(menu);
        },5);    	
		/*
		var menu = new menuLayer();
        	menu.init();
        	this.addChild(menu);*/
	}
});

splashLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        var action = cc.TintBy.create(3, 255, 255, 255);
        
        var title = cc.Sprite.create("img/splash.png");
        title.setPosition(400, 240);
        title.runAction(action);
        this.addChild(title);
                	
        
        return this;
    }
});


menuLayer = cc.Layer.extend({

	init:function(){
		this._super();
		
		var bg = cc.Sprite.create("img/menu.png");;
    	bg.setPosition(400,240);
    	this.addChild(bg);
		
		var action01 = cc.TintBy.create(3,255,255,255);
		var action02 = cc.TintBy.create(3,255,255,255);
		
		var title = cc.Sprite.create("img/title.png");
		title.setPosition(400,400);
		title.setScale(1.5);
		title.runAction(action01);
		this.addChild(title);
		
		var buttonPlay = cc.Sprite.create("img/playButton.png");
		var buttonCredits = cc.Sprite.create("img/creditsButton.png");
		var buttonControls = cc.Sprite.create("img/controlsButton.png");
		
		var play = cc.MenuItemSprite.create(buttonPlay, null,null, 'onStart', this);
		play.setPositionY(-60);
		var credits = cc.MenuItemSprite.create(buttonCredits, null,null, 'onCredits', this);
		credits.setPositionY(-120);
		var controls = cc.MenuItemSprite.create(buttonControls, null,null, 'onControls', this);
		controls.setPositionY(-180);
		
		var menu = cc.Menu.create(play, credits, controls);
        menu.setPosition(400, 280);
        menu.runAction(action02);
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

    	var menu = new menuLayer();
        menu.init();
        this.addChild(menu);

	}
});