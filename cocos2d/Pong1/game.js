gameLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        return this;
    }
});

game = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var layer = new gameLayer();
    	layer.init();
    	this.addChild(layer);
	}
});