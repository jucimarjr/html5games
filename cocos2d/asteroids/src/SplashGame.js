var SplashJogoLayer = cc.Layer.extend({

	init:function()
    {
		_title=null
        this._super();
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        
        /*var fundo = cc.Sprite.create("res/black_screen.png");
        fundo.setPositionX(tela.width/2);
        fundo.setPositionY(tela.height/2);
        this.addChild(fundo);*/
        
        this._title = cc.Sprite.create("res/images/title1_532-111.png");
        var action1 = cc.Blink.create(3, 10);
        this.addChild(this._title,1);
        this._title.setPosition(410,250);
        this._title.runAction(action1);
        
        this.schedule(this.onTick1, 3);
        
       // _title = new ActionBlink();
        
        return this;

    },onTick1:function (dt) {
    	var scene = cc.Scene.create();
		scene.addChild(new Menu());
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.0,scene));
    },
});

var SplashGame = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layerJogo = new SplashJogoLayer();
        layerJogo.init();
        this.addChild(layerJogo);
    }
});
