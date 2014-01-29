creditsLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        var credits = cc.LabelTTF.create("Programadores\nMatheus Palheta\nAnne Oliveira\n\nOrientador\nJucimar Jr",'Arial',30);
        credits.setPosition(400,240);
        credits.setFontFillColor(new cc.Color3B(50, 205, 50));
        credits.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(credits);
        
        var back = cc.MenuItemFont.create("BACK", 'back', this);
        var menu = cc.Menu.create(back);
        menu.setPosition(400,20);
        this.addChild(menu);
        
        return this;
    },
    back:function(){
    	cc.Director.getInstance().replaceScene(new menu());
    }
});

credits = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var layer = new creditsLayer();
    	layer.init();
    	this.addChild(layer);
	}
});