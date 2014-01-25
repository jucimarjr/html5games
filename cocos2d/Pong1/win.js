var winlayer = cc.Layer.extend({
	init:function()
	{
		var text = cc.LabelTTF.create("","Arial",40);
		text.setPosition(400,240);
		text.setString("Player 1 Wins");
		this.addChild(text);
	}
});

var win = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new winlayer();
        layer.init();
        this.addChild(layer);
    }
});