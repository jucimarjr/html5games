var Menu1Layer = cc.Layer.extend({
	init:function(){
		this._super;
		
		var background = cc.Director.getInstance().getWinSizeInPixels();
        var fundo = new cc.Sprite.create("Imagens/Telas/Tela_Menu_1.png");
        fundo.setPositionX(background.width/2);
        fundo.setPositionY(background.height/2);
        this.addChild(fundo);
        
        var btPlay = cc.Sprite.create("Imagens/palavras/play.png");
        var btPlaySelecionado = cc.Sprite.create("Imagens/palavras/play_selecionado.png");
        
        var start = cc.MenuItemSprite.create(btPlay,btPlaySelecionado,null,'onStart',this);
        var menu = cc.Menu.create(start);
        menu.setPosition(300,250);
        this.addChild(menu);
        
        return this;
        
		
	},
	onStart:function(){
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2,new menuPrincipal()));
	}
});
	
var Menu1 = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new Menu1Layer();
		layer.init();
		this.addChild(layer)
	}
})