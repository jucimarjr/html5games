gameLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        var bola = new Bola();
        this.addChild(bola);
        var barraesq = new Barra(0);
        this.addChild(barraesq);
        var barradir = new Barra(796);
        this.addChild(barradir);
        
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