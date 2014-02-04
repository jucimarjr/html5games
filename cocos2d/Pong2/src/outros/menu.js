var MenuLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        var fundo = new cc.Sprite.create("res/fundo.png");
        fundo.setPosition(tela.width/2,tela.height/2);
        this.addChild(fundo);

        cc.MenuItemFont.setFontName('Arcade Normal');
        cc.MenuItemFont.setFontSize(27);
        
        var btJogar = new cc.MenuItemFont.create("Jogar",'Jogar',this);
        btJogar.setPosition(new cc.p(tela.width/2,tela.height/2 + 30));
        
        var btInstrucoes = new cc.MenuItemFont.create("Instrucoes",'Instrucoes',this);
        btInstrucoes.setPosition(new cc.p(tela.width/2,tela.height/2 - 30));
        
        var btConfiguracoes = new cc.MenuItemFont.create("Configuracoes",'Configuracoes',this);
        btConfiguracoes.setPosition(new cc.p(tela.width/2,tela.height/2 - 90));
        
        var btCreditos = new cc.MenuItemFont.create("Creditos",'Creditos',this);
        btCreditos.setPosition(new cc.p(tela.width/2,tela.height/2 - 150));
        
		var menu = cc.Menu.create(btJogar,btInstrucoes,btConfiguracoes,btCreditos);
        menu.setPosition(new cc.p(0,0));
        this.addChild(menu);
		
        return this;
    },
    
    Jogar:function(){
    	players = 1;
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new game()));
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
