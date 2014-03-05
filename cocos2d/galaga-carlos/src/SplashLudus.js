var SplashInicialLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        var background = cc.Director.getInstance().getWinSizeInPixels();
               
        var fundo =  cc.Sprite.create("res/screenshoots/SplashLudus_480-600.png");
        fundo.setPositionX(background.width/2);
        fundo.setPositionY(background.height/2);
        this.addChild(fundo);
        
        

        this.schedule(this.onTick1, 3);
        
       return this;

    },onTick1:function (dt) {
    	var scene = cc.Scene.create();
		scene.addChild(new SplashGame());
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.5,scene));
    }
    

});

var SplashInicial = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new SplashInicialLayer();
        layer.init();
        //layer.timeSplash();
        this.addChild(layer);
    }
});
