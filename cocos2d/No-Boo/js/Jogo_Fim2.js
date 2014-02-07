var GameEndLoseLayer = cc.Layer.extend({
    init:function()
    {
        this._super();
        
        if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);

        //Pega o tamanho da tela
        var screen = cc.Director.getInstance().getWinSize();

        var fundo = cc.Sprite.create("assets/Telas/perdeu.png");
        fundo.setPositionX(screen.width / 2);
        fundo.setPositionY(screen.height / 2);
        this.addChild(fundo);
         
        var Label = cc.LabelTTF.create("Voce perdeu... ", "Grinched", 50);
        Label.setPosition(new cc.Point(screen.width / 2, 50));
        this.addChild(Label);

        cc.AudioEngine.getInstance().playMusic("Som/GhostBusters_.mp3", true);
                
       return this;

    },
    
    onMouseUp: function (event) {
        this.mudaCena();
    },

    onTouchesEnded: function (touches, event) {
        this.mudaCena();
    },

    mudaCena: function (dt) {
        var scene = cc.Scene.create();
        scene.addChild(new Menu());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.0, scene));
    }

});

var GameEndLoseScene = cc.Scene.extend({
    onEnterTransitionDidFinish:function(){
        this._super();
        var layer = new GameEndLoseLayer();
        layer.init();
        this.addChild(layer);
    }
});