var ConfiguracoesLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        var fundo = new cc.Sprite.create("res/configuracoes.png");
        fundo.setPosition(tela.width/2,tela.height/2);
        this.addChild(fundo);
        
        cc.MenuItemFont.setFontName('Arcade Normal');
        cc.MenuItemFont.setFontSize(27);
        
        var btJogar = new cc.MenuItemFont.create("Pontos maximo",'Jogar',this);
        btJogar.setPosition(new cc.p(tela.width/2,tela.height/2 + 30));
        
        var btInstrucoes = new cc.MenuItemFont.create("Jogador direito",'Jogar',this);
        btInstrucoes.setPosition(new cc.p(tela.width/2,tela.height/2 - 30));
        
        var btConfiguracoes = new cc.MenuItemFont.create("Jogador esquerdo",'Jogar',this);
        btConfiguracoes.setPosition(new cc.p(tela.width/2,tela.height/2 - 90));
        
        var btCreditos = new cc.MenuItemFont.create("Som",'Jogar',this);
        btCreditos.setPosition(new cc.p(tela.width/2,tela.height/2 - 150));

		cc.MenuItemFont.setFontSize(15);
        var btVoltar = cc.MenuItemFont.create("Voltar", 'Voltar', this);
        btVoltar.setPosition(new cc.p(tela.width/2 + 250,tela.height/2 - 210));
        
		var menu = cc.Menu.create(btJogar,btInstrucoes,btConfiguracoes,btCreditos,btVoltar);
        menu.setPosition(new cc.p(0,0));
        this.addChild(menu);
                
        return this;
    },
    
    Jogar:function(){
    	cc.Loader.preload(
    		[],
    		function(){
				var scene = cc.Scene.create();
				scene.addChild(aviso.create());
				cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
			},this);
    },
    
    Voltar:function(){
    	cc.Director.getInstance().replaceScene(new MenuScene());
    }
});

var ConfiguracoesScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new ConfiguracoesLayer();
        layer.init();
        this.addChild(layer);
    }
});

ConfiguracoesLayer.create = function() {
    var sg = new ConfiguracoesLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

ConfiguracoesLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = ConfiguracoesLayer.create();
    scene.addChild(layer, 1);
    return scene;
};
