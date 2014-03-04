var screen = null;
var layer = null;

var gameLayer = cc.Layer.extend({
	
	init:function(){
	}
	
});

var game = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new gameLayer();
        layer.init();
        this.addChild(layer);
    }
});