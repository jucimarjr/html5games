/**
 * Created by aluno on 14/11/13.
 */
var SplashLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        tela = cc.Director.getInstance().getWinSizeInPixels();
        var backGround = new cc.Sprite.create("Splash.png");
        backGround.setPositionX(tela.width/2);
        backGround.setPositionY(tela.height/2);
        this.addChild(backGround);
        
        
        /*
        var btStart1 = cc.Sprite.create("btStart.png");
        var btStart2 = cc.Sprite.create("btStart.png");
        var btCreditos1 = cc.Sprite.create("btCredits.png");
        var btCreditos2 = cc.Sprite.create("btCredits.png");
        var start = cc.MenuItemSprite.create(btStart1, btStart2, this, function () {
            this.Start();
        });
        var creditos = cc.MenuItemSprite.create(btCreditos1, btCreditos2, this, function () {
            this.Start();
        });
        var menu = cc.Menu.create(start, creditos);
        menu.setPosition(new cc.p(400,300));
        */
        
        var btStart = new cc.MenuItemFont.create("Start",'Start',this);
        btStart.setPosition(new cc.p(tela.width/2,tela.height/2 + 50));
        var menu = cc.Menu.create(btStart);
        menu.setPosition(new cc.p(0,0));

        
        this.addChild(menu);
        return this;
    },
    Start:function(){
    	cc.Loader.preload(
    			[{src:"alarm.mp3"}],
    			function(){
    				var scene = cc.Scene.create();
    				scene.addChild(aviso.create());
    				cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    			},this);
    }
});

var Splash = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new SplashLayer();
        layer.init();
        this.addChild(layer);
    }
});
