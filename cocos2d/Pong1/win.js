var win = cc.Layer.extend({
	init:function()
	{
		var text = cc.LabelTTF.create("","Arial",40);
		text.setString("You Win!!\nScore: ");
		 this.addChild(text);
	}
})

var winscene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new win();
        layer.init();
        this.addChild(layer);
    }
});