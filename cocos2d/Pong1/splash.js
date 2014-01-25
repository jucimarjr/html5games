splashLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        var i = 1;
        var path = "assets/SPLASH" + i + ".png";
        var tela = cc.Sprite.create(path);
        int = setInterval(function(){
        	i++;
        	tela.setTexture(cc.TextureCache.getInstance().addImage("assets/SPLASH" + i + ".png"));
        }, 240);
        if(i > 72){
        	clearInterval(int);
        }
        	
        
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