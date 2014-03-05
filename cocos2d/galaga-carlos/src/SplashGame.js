var SplashJogoLayer = cc.Layer.extend({

	init:function()
    {
		_title=null
        this._super();
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        
        var fundo = cc.Sprite.create("res/screenshoots/Menu_480-600.png");
        fundo.setPositionX(tela.width/2);
        fundo.setPositionY(tela.height/2);
        this.addChild(fundo);
        
        //this._title = cc.Sprite.create("res/screenshots/Menu_480-600");
        //var action1 = cc.Blink.create(3, 10);
        //this.addChild(this._title,1);
        //this._title.setPosition(410,250);
        //this._title.runAction(action1);
        
        //this.schedule(this.onTick1, 3);
        
       // _title = new ActionBlink();
        
        return this;

    }
});

var SplashGame = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layerJogo = new SplashJogoLayer();
        layerJogo.init();
        this.addChild(layerJogo);
    }
});
