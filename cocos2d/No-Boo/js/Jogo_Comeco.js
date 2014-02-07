var GameStartLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        var background = cc.Director.getInstance().getWinSizeInPixels();
               
        //Pega o tamanho da tela
        var screen = cc.Director.getInstance().getWinSize();

        var Label = cc.LabelTTF.create("Extermine os Fantasmas!!", "GhoulySolidRegular", 50);
        Label.setPosition(new cc.Point(screen.width/2, screen.height/2));
        this.addChild(Label);
        
        Label.setScale(0.5);
        Label.runAction( cc.FadeIn.create( 1.0 ) );
        Label.runAction( cc.ScaleTo.create( 3.0 , 1.0 ) );
        
        this.schedule(this.onTick1, 3);
        
       return this;

    },onTick1:function (dt) {
    	var scene = cc.Scene.create();
		scene.addChild(new GameScene());
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.5,scene));
    },
    

});

var GameStartScene = cc.Scene.extend({
    onEnterTransitionDidFinish:function(){
        this._super();
        var layer = new GameStartLayer();
        layer.init();
        this.addChild(layer);
    }
});