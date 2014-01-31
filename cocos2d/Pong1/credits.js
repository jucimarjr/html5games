creditsLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
		var programers_title = cc.Sprite.create("assets/credits_programers.png");
		programers_title.setPosition(400, 400);
		this.addChild(programers_title);
		
        var programers = cc.LabelTTF.create("Matheus Palheta\nAnne Oliveira",'Arial',30);
        programers.setPosition(400,300);
        programers.setFontFillColor(new cc.Color3B(50, 205, 50));
        programers.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(programers);
		
		var teacher_title = cc.Sprite.create("assets/credits_teacher.png");
		teacher_title.setPosition(400, 200);
		this.addChild(teacher_title);
		
		var teacher = cc.LabelTTF.create("Jucimar Jr",'Arial',30);
        teacher.setPosition(400,120);
        teacher.setFontFillColor(new cc.Color3B(50, 205, 50));
        teacher.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(teacher);
                
		var btBack = cc.Sprite.create("assets/btBack.png");
		var back = cc.MenuItemSprite.create(btBack, null,null, 'btBack', this);
		back.setPositionY(20);
		
        var menu = cc.Menu.create(back);
        menu.setPosition(400,20);
        this.addChild(menu);
        
        return this;
    },
	btBack:function(){
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