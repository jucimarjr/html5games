
var MenuLayer = cc.Layer.extend({
	
    init:function()
    {
        this._super();
        var tocando = 1;
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        
        var fundo = cc.Sprite.create("assets/Telas/wireframe_splash_jogo.png");
        fundo.setPositionX(tela.width/2);
        fundo.setPositionY(tela.height/2);
        this.addChild(fundo);
        
        bt_Play = cc.Sprite.create("assets/Telas/botoes/btn_jogar.png");
        bt_Play_Selecionado = cc.Sprite.create("assets/Telas/botoes/btnselecionado_jogar.png");
        bt_Creditos = cc.Sprite.create("assets/Telas/botoes/creditos.png");
        bt_Creditos_Selecionado = cc.Sprite.create("assets/Telas/botoes/creditos_selecionados.png");
        bt_Jogar = cc.Sprite.create("assets/Telas/botoes/jogar.png");
        bt_Jogar_Selecionado = cc.Sprite.create("assets/Telas/botoes/jogar_selecionado.png");
        bt_som = cc.Sprite.create("assets/Telas/som.png");
        bt_som_desligado = cc.Sprite.create("assets/Telas/som_desligado.png");
                
        var play = cc.MenuItemSprite.create(bt_Play,bt_Play_Selecionado,null,'onPlay',this);
        var creditos = cc.MenuItemSprite.create(bt_Creditos,bt_Creditos_Selecionado,null,'onCredito',this);
        creditos.setPosition(0,-60);
        var comoJogar = cc.MenuItemSprite.create(bt_Jogar,bt_Jogar_Selecionado,null,'onJogar',this);
        comoJogar.setPosition(0,-120);
        var item1 = cc.MenuItemToggle.create(
                cc.MenuItemSprite.create(bt_som),
                cc.MenuItemSprite.create(bt_som_desligado));
            item1.setCallback(this.onMenuCallback, this);
            item1.setPosition(-290,-260)
                
        var menu = cc.Menu.create(play,creditos,comoJogar,item1);
        menu.setPosition(320,300);
        this.addChild(menu);
        
        return this;	
    },

    onPlay: function () {
        if (cc.AudioEngine.getInstance().isMusicPlaying())
            cc.AudioEngine.getInstance().stopMusic();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameStartScene()));
    },

    onCredito: function () {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new CreditosScene()));
    },

    onJogar: function () {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new ComoJogarScene()));
    },
    onMenuCallback:function (sender) {
    	if (cc.AudioEngine.getInstance().isMusicPlaying()){
    		cc.AudioEngine.getInstance().stopMusic();
    	}else{
    		cc.AudioEngine.getInstance().playMusic("Som/GhostBusters_.mp3", true);
    	}
            
    	
        cc.log("Callback called");
    }

});

var Menu = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layerMenu = new MenuLayer();
        layerMenu.init();
        this.addChild(layerMenu);
    }
});