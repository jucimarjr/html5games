var SplashLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        
        var fundo = cc.Sprite.create("Imagens/Telas/Tela_Splash.png");
        this.addChild(fundo);
        fundo.setPosition(tela.width / 2, tela.height / 2);
                
        setTimeout(function(){
        	cc.Loader.preload([
        	    {src:"Imagens/palavras/Play.plist"},
				{src:"Imagens/palavras/Som.plist"},
				{src:"sons/Jumpshot.mp3"}
        	], function(){
        		var scene = cc.Scene.create();
        		scene.addChild(new Menu1());
        		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.5,scene));
        	})
        },3000);
        
        return this;

    },

});

var SplashScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new SplashLayer();
        layer.init();
        this.addChild(layer);
    }
});