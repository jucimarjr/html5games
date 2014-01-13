var HelloWorldLayer = cc.Layer.extend({
    init:function()
    {
        this._super();

        var s = cc.Director.getInstance().getWinSize();

        var layer1 = cc.LayerColor.create(new cc.Color4B(255, 255, 0, 255), 600, 600);
        layer1.setAnchorPoint(new cc.Point(0.5,0.5));

        
        var helloLabel = cc.LabelTTF.create("Hello world", "Arial", 30);
        helloLabel.setPosition(new cc.Point(s.width/2,s.height/2));
        helloLabel.setColor(new cc.Color3B(255,0,0));
        var rotationAmount = 0;
        var scale = 1;
        helloLabel.schedule(function()
            {
                this.setRotation(rotationAmount++);
                if(rotationAmount > 360)
                    rotationAmount = 0;
                this.setScale(scale);
                scale+= 0.05;
                if(scale > 10)
                    scale =1;
            });

        layer1.addChild(helloLabel);
        this.addChild(layer1);

        
        return true;
    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new HelloWorldLayer();
        layer.init();
        this.addChild(layer);
    }
});