var SplashGameLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        var background = cc.Director.getInstance().getWinSizeInPixels();
               
        var fundo =  cc.Sprite.create("res/screenshots/splashGame_800-480.png");
        fundo.setPositionX(background.width/2);
        fundo.setPositionY(background.height/2);
        this.addChild(fundo);    

        this.schedule(this.onTick1, 3);
        
       return this;

    },onTick1:function (dt) {
    	var scene = cc.Scene.create();
		scene.addChild(new Menu());
		cc.Director.getInstance().replaceScene(cc.TransitionFadeBL.create(1.5,scene));
    }

});

var SplashGame = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new SplashGameLayer();
        layer.init();
        this.addChild(layer);
    }
});
