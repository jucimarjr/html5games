creditsLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        return this;
    }
});

credits = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var layer = new creditsLayer();
    	layer.init();
    	this.addChild(layer);
	}
});