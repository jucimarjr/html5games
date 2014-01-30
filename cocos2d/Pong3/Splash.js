var SplashLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        var fundo = new cc.Sprite.create("Imagens/Telas/Tela_Splash.png");
        fundo.setPositionX(tela.width/2);
        fundo.setPositionY(tela.height/2);
        this.addChild(fundo);
        
        var btStart = new cc.MenuItemFont.create("Start",'Start',this);
        btStart.setPosition(new cc.p(tela.width/2,tela.height/2 + 50));
        var menu = cc.Menu.create(btStart);

        this.addChild(menu);
        return this;
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