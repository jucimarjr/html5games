

splash = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var bg = new gameLayer();
    	bg.init(true, 0);
    	
	}
});