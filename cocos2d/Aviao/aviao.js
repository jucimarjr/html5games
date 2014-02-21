var AviaoLayer = cc.Layer.extend({
    init:function()
    {
            jetSprite = cc.Sprite.create("jet.png");
            jetSprite.setPosition(new cc.Point(300,300));
            
            this.addChild(jetSprite);
            return true;
        
    }

});

var AviaoScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new AviaoLayer();
        layer.init();
        this.addChild(layer);
    }
});