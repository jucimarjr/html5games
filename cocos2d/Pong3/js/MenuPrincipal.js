var MenuPrincipalLayer = cc.Layer.extend({
	init:function(){
		this._super;
		
		var background = cc.Director.getInstance().getWinSizeInPixels();
        var fundo = new cc.Sprite.create("Imagens/Telas/Tela_Menu_Principal.png");
        fundo.setPositionX(background.width/2);
        fundo.setPositionY(background.height/2);
        this.addChild(fundo);
        
        bt_1Player = cc.Sprite.create("Imagens/palavras/1_Player.png");
        bt_1Player_Selecionado = cc.Sprite.create("Imagens/palavras/1_Player_Selecionado.png");
        bt_2Player = cc.Sprite.create("Imagens/palavras/2_Player.png");
        bt_2Player_Selecionado = cc.Sprite.create("Imagens/palavras/2_Player_Selecionado.png");
        bt_Configuracoes = cc.Sprite.create("Imagens/palavras/Configuracoes.png");
        bt_Configuracoes_Selecionado = cc.Sprite.create("Imagens/palavras/Configuracoes_Selecionado.png");
        bt_Creditos = cc.Sprite.create("Imagens/palavras/Credito.png");
        bt_Creditos_Selecionado = cc.Sprite.create("Imagens/palavras/credito_selecionado.png");
        
        var player_1 = cc.MenuItemSprite.create(bt_1Player,bt_1Player_Selecionado,null,'onPlayer1',this);
        var player_2 = cc.MenuItemSprite.create(bt_2Player,bt_2Player_Selecionado,null,'onPlayer2',this);
        player_2.setPosition(0,-60);
        var configuracoes = cc.MenuItemSprite.create(bt_Configuracoes,bt_Configuracoes_Selecionado,null,'onConfiguracoes',this);
        configuracoes.setPosition(0,-120);
        var creditos = cc.MenuItemSprite.create(bt_Creditos,bt_Creditos_Selecionado,null,'onCreditos',this);
        creditos.setPosition(0,-180);
        
        var menu = cc.Menu.create(player_1,player_2,configuracoes,creditos);
        menu.setPosition(300,300);
        this.addChild(menu);
        
        return this;	
	},onPLayer1:function(){
		//cc.Director.getInstance().replaceScene(cc.TranstionFade.create(1.2,new JogoScene()))
	},onPLayer2:function(){
		//cc.Director.getInstance().replaceScene(cc.TranstionFade.create(1.2,new JogoScene()))
	},onConfiguracoes:function(){
		//cc.Director.getInstance().replaceScene(cc.TranstionFade.create(1.2,new JogoScene()))
	},onCreditos:function(){
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2,new creditos()))
	}
	
});

var menuPrincipal = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new MenuPrincipalLayer();
		layer.init();
		this.addChild(layer)
	}
})