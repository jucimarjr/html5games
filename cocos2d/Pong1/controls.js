controlsLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        var image = cc.Sprite.create("assets/controls.png");
        image.setPosition(400, 240);
        this.addChild(image);
                
		var btBack = cc.Sprite.create("assets/btBack.png");
		var back = cc.MenuItemSprite.create(btBack, null,null, 'btBack', this);
		back.setPositionY(20);
		
        var menu = cc.Menu.create(back);
        menu.setPosition(400,20);
        this.addChild(menu);
        
        return this;
    },    
	btBack:function(){
    	cc.Director.getInstance().replaceScene(new menu());
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