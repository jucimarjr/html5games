var SplashLudusLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        var background = cc.Director.getInstance().getWinSizeInPixels();
               
        var label = cc.LabelTTF.create("START!", "GhoulySolidRegular", 70);
        label.setPosition(new cc.Point(background.width / 2, background.height / 2));
        label.setColor(new cc.Color4B(0, 0, 0, 255));
        this.addChild(label);

        var fundo =  cc.Sprite.create("res/screenshots/splashTeam_800-480.png");
        fundo.setPositionX(background.width/2);
        fundo.setPositionY(background.height/2);
        this.addChild(fundo);    

        this.schedule(this.onTick1, 3);
        
       return this;

    },onTick1:function (dt) {
    	var scene = cc.Scene.create();
		scene.addChild(new SplashGame());
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.5, scene, cc.c3b(255, 255, 255)));
    }
    

});

var SplashLudus = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new SplashLudusLayer();
        layer.init();
        this.addChild(layer);
    }
});
