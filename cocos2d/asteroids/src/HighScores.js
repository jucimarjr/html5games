var HighScoresLayer = cc.Layer.extend({
    init: function()
    {
        this._super();

	if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);

        var background = cc.Director.getInstance().getWinSizeInPixels();      
        var fundo =  cc.Sprite.create("res/screenshots/highScores_800-480.png");
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

var HighScores = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layerHighScores = new HighScoresLayer();
        layerHighScores.init();
        this.addChild(layerHighScores);
    }
});
