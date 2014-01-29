controlsLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        var image = cc.Sprite.create("assets/controls.png");
        image.setPosition(400, 240);
        this.addChild(image);
        
        var back = cc.MenuItemFont.create("BACK", 'back', this);
        var menu = cc.Menu.create(back);
        menu.setPosition(400,20);
        this.addChild(menu);
        
        return this;
    },
    back:function(){
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