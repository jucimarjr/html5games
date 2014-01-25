controlsLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        return this;
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