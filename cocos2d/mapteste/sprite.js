var sprite = cc.Sprite.extend({
	actions:null,
	movable:false,
	ctor:function(){
		this._super();
		this.initWithFile("assets/tiles/sprite1.png");
		return this;
	},
	openOptions:function(){
		//cc.log("open Options");
	},
	crouch:function(){
		cc.log("crouch");/*
		var gamelayer = this.getParent();
		gamelayer.tatics.setPosition(-900000,-900000);*/
	},
	prone:function(){
		cc.log("prone");/*
		var gamelayer = this.getParent();
		gamelayer.tatics.setPosition(-900000,-900000);*/
	},
	cover:function(){
		cc.log("cover");/*
		var gamelayer = this.getParent();
		gamelayer.tatics.setPosition(-900000,-900000);*/
	},
	move:function(point){
		var p = cc.pAdd(point, cc.p(0,56));
		cc.log(cc.pDistance(this.getPosition(), p));
		var moveToP = cc.MoveTo.create((cc.pDistance(this.getPosition(), p)/200), p);
		this.runAction(moveToP);
		
	}
});