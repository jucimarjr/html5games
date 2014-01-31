winLayer = cc.Layer.extend({
	init:function()
	{
		this._super();
		if(ponto1 >= 10){
			var playerWin = cc.Sprite.create("assets/playerWin2.png");
		}else{
			var playerWin = cc.Sprite.create("assets/playerWin.png");
		}
		
		playerWin.setPosition(400, 300);
		this.addChild(playerWin);
		
		var btBack = cc.Sprite.create("assets/btBack.png");
		var back = cc.MenuItemSprite.create(btBack, null,null, 'btBack', this);
		back.setPositionY(20);
		
        var menu = cc.Menu.create(back);
        menu.setPosition(400,20);
        this.addChild(menu);
		
		return this;
	},
	btBack:function(){
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.3, new menu()));
    }	
});

win = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new winLayer();
        layer.init();
        this.addChild(layer);
    }
});