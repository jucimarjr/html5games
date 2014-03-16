var SplashJogoLayer = cc.Layer.extend({

	init:function()
    {
		_title=null
        this._super();
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        
        var fundo = cc.Sprite.create("res/screenshoots/Menu6_480-600.png");
        fundo.setPositionX(tela.width/2);
        fundo.setPositionY(tela.height/2);
        this.addChild(fundo);
        
       
        
        this.schedule(this.onTick1, 5);
        
       // _title = new ActionBlink();
        
        return this;

    },onTick1:function (dt) {
    	var scene = cc.Scene.create();
		scene.addChild(new Menu());
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.0,scene));
    }
});

var SplashGame = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layerJogo = new SplashJogoLayer();
        layerJogo.init();
        this.addChild(layerJogo);
    }
});
