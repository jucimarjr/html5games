var SplashJogoLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        
        var fundo = cc.Sprite.create("assets/Telas/wireframe_splash_jogo.png");
        fundo.setPositionX(tela.width/2);
        fundo.setPositionY(tela.height/2);
        this.addChild(fundo);
        
        this.schedule(this.onTick1, 3);
        
        return this;

    },onTick1:function (dt) {
    	var scene = cc.Scene.create();
		scene.addChild(new Menu());
		cc.Director.getInstance().replaceScene(cc.TransitionCrossFade.create(1.0,scene));
    }
});

var SplashJogo = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layerJogo = new SplashJogoLayer();
        layerJogo.init();
        this.addChild(layerJogo);
    }
});