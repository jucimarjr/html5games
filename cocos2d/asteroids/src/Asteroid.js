var asteroidsLayer = cc.Layer.extend({	
    init:function()
    {
		this._super();
		
		var asteroids =  cc.Sprite.create("res/images/asteroid1_117-119.png");
		this.addChild(asteroids);
	},
});

var asteroids = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new asteroidsLayer();
        layer.init();
        this.addChild(layer);
    }
});