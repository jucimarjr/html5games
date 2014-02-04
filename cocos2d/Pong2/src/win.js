winLayer = cc.Layer.extend({
	init:function()
	{
	    this._super();
	    
	    var tela = cc.Director.getInstance().getWinSizeInPixels();
	    var fundo = new cc.Sprite.create("res/ganhouEsquerdo.png");
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

win = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new winLayer();
        layer.init();
        this.addChild(layer);
    }
});