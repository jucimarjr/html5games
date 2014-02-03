creditsLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        var background = cc.Director.getInstance().getWinSizeInPixels();
        var fundo = new cc.Sprite.create("Imagens/Telas/Tela_Creditos_Com_Som.png");
        fundo.setPositionX(background.width/2);
        fundo.setPositionY(background.height/2);
        this.addChild(fundo);
        
		var btBack = cc.Sprite.create("Imagens/palavras/bt_voltar.png");
		var btBack_= cc.Sprite.create("Imagens/palavras/bt_voltar_selecionado.png");
		var back = cc.MenuItemSprite.create(btBack, btBack_ ,null, 'btBack', this);
		back.setPositionY(20);
		
        var menu = cc.Menu.create(back);
        menu.setPosition(550,40);
        this.addChild(menu);
        
        return this;
    },
	btBack:function(){
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.3, new menuPrincipal()));
    }	
});

creditos = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var layer = new creditsLayer();
    	layer.init();
    	this.addChild(layer);
	}
});
