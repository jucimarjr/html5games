var SplashLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        var fundo = new cc.Sprite.create("res/splash.png");
        fundo.setPosition(tela.width/2, tela.height/2);
        this.addChild(fundo);
        
        var btStart = new cc.MenuItemFont.create("Start",'Start',this);
        btStart.setPosition(new cc.p(tela.width/2,tela.height/2 + 50));
        
		var start = cc.Menu.create(btStart);
        start.setPosition(new cc.p(0,0));

        this.addChild(start);
        return this;
    },
    
    Start:function(){
    	cc.Loader.preload(
    		[],
    		function(){
				var scene = cc.Scene.create();
				scene.addChild(MenuLayer.create());
				cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
			},this);
    }
});

var SplashScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new SplashLayer();
        layer.init();
        this.addChild(layer);
    }
});