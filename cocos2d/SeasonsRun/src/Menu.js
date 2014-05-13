var MenuLayer = cc.Layer.extend({

    title: null,
    menu: null,
    move: null,
    moveCredits: null,
    elastic: null,
    elasticCredits: null,
    credits: null,
    creditsActive: null,

    init:function()
    {
        this._super();
        this.setMouseEnabled(true);
        var screen = cc.Director.getInstance().getWinSizeInPixels();
        this.move = cc.MoveBy.create(2, cc.p(screen.width+300, 0));
        this.elastic = cc.EaseElasticInOut.create(this.move.clone(), 0.3);
        this.moveCredits = cc.MoveBy.create(2, cc.p(screen.width, 0));
        this.elasticCredits = cc.EaseElasticInOut.create(this.moveCredits.clone(), 0.3);

        cc.AudioEngine.getInstance().playMusic("res/audios/seaBackground.mp3", true);
        cc.AudioEngine.getInstance().setMusicVolume(0.5);

        //Inicia pontuação
        if (typeof localStorage["scores"] == "undefined") {
            var lapTime = new Date();
            lapTime.setMinutes(0);
            lapTime.setSeconds(0);
            lapTime.setMilliseconds(0);
            localStorage["bestTime"] = lapTime;
            localStorage["bestScore"] = 0;
            localStorage["scores"] = "ok";
        }

        this.title = cc.Sprite.create("res/images/title.png");
		this.title.setPosition(new cc.Point(screen.width/2, screen.height - 50) );
        this.addChild(this.title);        
        
        btSP = cc.Sprite.create("res/images/buttons/btnPlay_155-34.png");
        btMP = cc.Sprite.create("res/images/buttons/btnPlayMulti_155-34.png");
        btCredits = cc.Sprite.create("res/images/buttons/btnCredits_256-34.png");
        btSPSelected = cc.Sprite.create("res/images/buttons/btnPlaySelected_155-34.png");
        btMPSelected = cc.Sprite.create("res/images/buttons/btnPlayMultiSelected_155-34.png");
        btCreditsSelected = cc.Sprite.create("res/images/buttons/btnCreditsSelected_256-34.png");

        var sPlay = cc.MenuItemSprite.create(btSP, btSPSelected, null, 'onSPlay', this);
        var mPlay = cc.MenuItemSprite.create(btMP, btMPSelected, null, 'onMPlay', this);
        mPlay.setPosition(0,-60);
        var credits = cc.MenuItemSprite.create(btCredits, btCreditsSelected, null, 'onCredits', this);
        credits.setPosition(0, -120);
                
        this.menu = cc.Menu.create(sPlay,mPlay,credits);
        this.menu.setPosition(-400, 310);
        this.menu.runAction( cc.Sequence.create( cc.DelayTime.create(1) , this.elastic ));
      
        var label = cc.LabelTTF.create("Best: " + localStorage["bestScore"] + "m", "PipeDream", 50);
        label.setPosition(new cc.Point(screen.width - 160, 30));
        label.setColor(new cc.Color4B(10, 10, 10, 255));
        this.addChild(label);

        this.addChild(this.menu);
        
        return this;	
    },

    onSPlay: function () {
        cc.AudioEngine.getInstance().playEffect("res/audios/menuSelect.wav");
        this.menu.runAction(this.elastic.reverse());
        localStorage["gameType"] = "single";
        setTimeout(function () { cc.Director.getInstance().replaceScene(new GameScene()) } , 1500 );
    },

    onMPlay: function () {
        cc.AudioEngine.getInstance().playEffect("res/audios/menuSelect.wav");
        this.menu.runAction(this.elastic.reverse());
        localStorage["gameType"] = "multi";
        setTimeout(function () { cc.Director.getInstance().replaceScene(new GameScene()) }, 1500);
    },

    onCredits: function () {

        cc.AudioEngine.getInstance().playEffect("res/audios/menuSelect.wav");
        this.creditsActive = true;
        this.credits = cc.Sprite.create("res/screenshots/credits_800-480.png");
        this.addChild(this.credits);
        this.credits.setPosition(-screen.width/2, screen.height/2);
                
        this.menu.runAction(this.elastic.reverse());
        this.credits.runAction(this.elasticCredits);

    },

    onMouseDown: function (event) {

        if (this.creditsActive) {
            cc.AudioEngine.getInstance().playEffect("res/audios/menuSelect.wav");
            this.creditsActive = false;
            this.credits.runAction(this.elasticCredits.reverse());
            this.menu.runAction(this.elastic);
        }

    },

});

Menu = cc.Scene.extend({
    onEnter:function(){
        this._super();

		var layerMenu = new MenuLayer();
        layerMenu.init();
        this.addChild(layerMenu, 1);

        var layer = new GameLayer();
        layer.init();
        this.addChild(layer,0);

    }
});