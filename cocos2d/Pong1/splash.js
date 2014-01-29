splashLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        var title = cc.Sprite.create("assets/TITLE.png");
        title.setPosition(400, 400);
        this.addChild(title);
                	
        
        return this;
    }
});

splash = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var layer = new splashLayer();
    	layer.init();
    	this.addChild(layer);
	}
});