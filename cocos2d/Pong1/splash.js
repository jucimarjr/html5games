splashLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        var title = cc.Sprite.create("assets/LOGO1.png");
        title.setPosition(400, 240);
        this.addChild(title);
        players = 0;
        
        this.scheduleOnce(function(){
        	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(2,new menu()));
        },5);
                	
        
        return this;
    }
});

splash = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var bg = new gameLayer();
    	bg.init(true, 0);
    	var layer = new splashLayer();
    	layer.init();
    	this.addChild(bg);
    	this.addChild(layer);
    	
	}
});