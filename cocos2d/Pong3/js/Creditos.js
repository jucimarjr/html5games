var creditosLayer = cc.Layer.extend({
	init:function(){
		this._super();
		
		var background = cc.Director.getInstance().getWinSizeInPixels();
        var fundo = new cc.Sprite.create("Imagens/Telas/Tela_Creditos.png");
        fundo.setPositionX(background.width/2);
        fundo.setPositionY(background.height/2);
        this.addChild(fundo);
        
        var back = cc.MenuItemFont.create("Voltar",'voltar',this);
        var menu = cc.Menu.create(menu);
        menu.setPosition(90,100);
        this.addChild(menu);
        
        return this;
        
        //var bt_voltar = cc.Sprite.create("Imagens/palavras/voltar.png");
        //var bt_voltar_selecionado = cc.Sprite.create("Imagens/palavras/voltar_selecionado.png");
        
        //var voltar = cc.MenuItemSprite.create(bt_voltar,null,null,'onVoltar',this);
        
        //var menu = cc.Menu.create(voltar);
        //menu.setPosition(90,100);
        //this.addChild(menu);
        
        //return this;
        
		
	},
	voltar:function(){
		alert("entrou");
		cc.Director.getInstance().replaceScene(cc.TranstionFade.create(1.2, new menuPrincipal()));
	}
});

var creditos = cc.Scene.extend({
	onEnter:function(){
		this._super;
		var layer = new creditosLayer();
		layer.init();
		this.addChild(layer);
	}
})