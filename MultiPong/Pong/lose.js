loseLayer = cc.Layer.extend({
	init:function(){
		
		var bg = cc.Sprite.create("img/lose.png");;
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

lose = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var layer = new loseLayer();
    	layer.init();
    	this.addChild(layer);
	}
});