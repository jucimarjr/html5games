var MenuLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        var fundo = new cc.Sprite.create("res/fundo.png");
        fundo.setPositionX(tela.width/2);
        fundo.setPositionY(tela.height/2);
        this.addChild(fundo);

        cc.MenuItemFont.setFontName('Arcade Normal');
        cc.MenuItemFont.setFontSize(27);
        
        var btJogar = new cc.MenuItemFont.create("Jogar",'Jogar',this);
        btJogar.setPosition(new cc.p(tela.width/2,tela.height/2 + 30));
        var menuJogar = cc.Menu.create(btJogar);
        menuJogar.setPosition(new cc.p(0,0));
        this.addChild(menuJogar);
        
        var btInstrucoes = new cc.MenuItemFont.create("Instrucoes",'Instrucoes',this);
        btInstrucoes.setPosition(new cc.p(tela.width/2,tela.height/2 - 30));
        var menuInstrucoes = cc.Menu.create(btInstrucoes);
        menuInstrucoes.setPosition(new cc.p(0,0));
        this.addChild(menuInstrucoes);
        
        var btConfiguracoes = new cc.MenuItemFont.create("Configuracoes",'Configuracoes',this);
        btConfiguracoes.setPosition(new cc.p(tela.width/2,tela.height/2 - 90));
        var menuConfiguracoes = cc.Menu.create(btConfiguracoes);
        menuConfiguracoes.setPosition(new cc.p(0,0));
        this.addChild(menuConfiguracoes);
        
        var btCreditos = new cc.MenuItemFont.create("Creditos",'Creditos',this);
        btCreditos.setPosition(new cc.p(tela.width/2,tela.height/2 - 150));
        var menuCreditos = cc.Menu.create(btCreditos);
        menuCreditos.setPosition(new cc.p(0,0));
        this.addChild(menuCreditos);
        
        return this;
    },
    
    Jogar:function(){
    	cc.Loader.preload(
    		[],
    		function(){
				var scene = cc.Scene.create();
				scene.addChild(TesteLayer.create());
				cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
			},this);
    },

    Instrucoes:function(){
    	cc.Loader.preload(
    		[],
    		function(){
				var scene = cc.Scene.create();
				scene.addChild(InstrucoesLayer.create());
				cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
			},this);
    },
    
    Configuracoes:function(){
    	cc.Loader.preload(
    		[],
    		function(){
				var scene = cc.Scene.create();
				scene.addChild(ConfiguracoesLayer.create());
				cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
			},this);
    },
    
    Creditos:function(){
    	cc.Loader.preload(
    		[],
    		function(){
				var scene = cc.Scene.create();
				scene.addChild(CreditosLayer.create());
				cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
			},this);
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});

MenuLayer.create = function() {
    var sg = new MenuLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

MenuLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = MenuLayer.create();
    scene.addChild(layer, 1);
    return scene;
};
