var HowToPlayLayer = cc.Layer.extend({
    init: function()
    {
        this._super();

	if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);

        var background = cc.Director.getInstance().getWinSizeInPixels();      
        var fundo =  cc.Sprite.create("res/screenshots/newHowToPlay_800-480.png");
        fundo.setPositionX(background.width/2);
        fundo.setPositionY(background.height/2);
        this.addChild(fundo);
        
        return this;

    },
    onMouseUp: function (event) {
        this.backMenu();
    },
    onTouchesEnded: function (touches, event) {
        this.backMenu();
    },
    backMenu: function (dt) {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.0, new Menu()));
    }
});

var HowToPlay = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layerHowToPlay = new HowToPlayLayer();
        layerHowToPlay.init();
        this.addChild(layerHowToPlay);
    }
});
