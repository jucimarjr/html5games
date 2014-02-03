creditsLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
		var btBack = cc.Sprite.create("Imagens/palavras/voltar.png");
		var back = cc.MenuItemSprite.create(btBack, null,null, 'btBack', this);
		back.setPositionY(20);
		
        var menu = cc.Menu.create(back);
        menu.setPosition(400,20);
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