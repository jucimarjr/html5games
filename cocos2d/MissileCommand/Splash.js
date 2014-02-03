/**
 * Created by aluno on 14/11/13.
 */
var SplashLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        tela = cc.Director.getInstance().getWinSizeInPixels();
        var backGround = new cc.Sprite.create("assets/Splash2.png");
        backGround.setPositionX(tela.width/2);
        backGround.setPositionY(tela.height/2);
        this.addChild(backGround);
        
        
        
        var btStart1 = cc.Sprite.create("assets/btStart.png");
        var btCreditos1 = cc.Sprite.create("assets/btCredits.png");
        var start = cc.MenuItemSprite.create(btStart1, null,null, 'Start', this);
        var creditos = cc.MenuItemSprite.create(btCreditos1,null,null, 'Credits',this);
        var menu = cc.Menu.create(start, creditos);
        menu.alignItemsVerticallyWithPadding(65);
        menu.setPosition(new cc.p(tela.width/2,tela.height/2));
        
        /*
        var btStart = new cc.MenuItemFont.create("Start",'Start',this);
        btStart.setPosition(new cc.p(tela.width/2,tela.height/2 + 50));
        var menu = cc.Menu.create(btStart);
        menu.setPosition(new cc.p(0,0));
		*/
        
        this.addChild(menu);
        return this;
    },
    Start:function(){
    	cc.Loader.preload(
    			[{src:"assets/alarm.mp3"}],
    			function(){
    				var scene = cc.Scene.create();
    				scene.addChild(aviso.create());
    				cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    			},this);
    },
    Credits:function(){
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new credits()));
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
