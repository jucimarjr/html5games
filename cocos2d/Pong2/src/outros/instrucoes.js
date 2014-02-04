var InstrucoesLayer = cc.Layer.extend({
	init:function()
    {
	    this._super();
	    
	    var tela = cc.Director.getInstance().getWinSizeInPixels();
	    var fundo = new cc.Sprite.create("res/instrucoes.png");
	    fundo.setPosition(tela.width/2,tela.height/2);
	    this.addChild(fundo);
	    
        cc.MenuItemFont.setFontSize(15);
        
        var btVoltar = cc.MenuItemFont.create("Voltar",'Voltar',this);
        btVoltar.setPosition(new cc.p(tela.width/2 + 250,tela.height/2 - 210));

		var voltar = cc.Menu.create(btVoltar);
        voltar.setPosition(new cc.p(0,0));
        this.addChild(voltar);
	    
	    return this;
    },
    
    Voltar:function(){
    	cc.Director.getInstance().replaceScene(new MenuScene());
    }
});

InstrucoesLayer.create = function() {
    var sg = new InstrucoesLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

InstrucoesLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = InstrucoesLayer.create();
    scene.addChild(layer, 1);
    return scene;
};