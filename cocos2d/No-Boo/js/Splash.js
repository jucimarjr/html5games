var SplashLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        var background = cc.Director.getInstance().getWinSizeInPixels();
        var fundo =  cc.Sprite.create("assets/Telas/Tela_Splash.png");
        fundo.setPositionX(background.width/2);
        fundo.setPositionY(background.height/2);
        this.addChild(fundo);
        
        this.schedule(this.onTick1, 5);
        
       return this;

    },onTick1:function (dt) {
    	var scene = cc.Scene.create();
		scene.addChild(new SplashJogo());
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.5,scene));
    },
    

});

var SplashScene = cc.Scene.extend({
    onEnterTransitionDidFinish:function(){
        this._super();
        var layer = new SplashLayer();
        layer.init();
        //layer.timeSplash();
        this.addChild(layer);
    }
});