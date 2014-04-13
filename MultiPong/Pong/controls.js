controlsLayer = cc.Layer.extend({
	init:function(){
		
		var bg = cc.Sprite.create("img/controls.png");;
    	bg.setPosition(400,240);
    	this.addChild(bg);
		
		var buttonBack = cc.Sprite.create("img/backButton.png");
		var back = cc.MenuItemSprite.create(buttonBack, null,null, 'onBack', this);
		back.setPositionY(20);
		back.setPositionX(300);
        var menu = cc.Menu.create(back);
        menu.setPosition(400,20);
        this.addChild(menu);
	},
	onBack:function(){
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.3, new menu()));
	}
});

controls = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var layer = new controlsLayer();
    	layer.init();
    	this.addChild(layer);
	}
});