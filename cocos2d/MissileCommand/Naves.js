/**
 * Created by aluno on 23/10/13.
 */
var Nave = cc.Sprite.extend({
	velx:0,
	vely:0,
    alive:true,
    ctor:function(vel){
        this._super();
        navesKill = 0;
        this.initWithFile("assets/naves.png");
        var posx = Math.random()*800;
        var angle;
        this.setPosition(new cc.Point(posx, tela.height));
        if(posx < 400)
        {
            angle = -Math.random()*45;
            this.velx = Math.sin(angle*0.0174)*(vel/2);
            this.vely = Math.cos(angle * 0.0174) * (vel/2);
        }else{
            angle = Math.random()*45;
            this.velx = Math.sin(angle*0.0174)*(vel/2);
            this.vely = Math.cos(angle * 0.0174) * (vel/2);
        }
        this.setRotation(angle);
        this.scheduleUpdate();
        /*
        this.schedule(function(){
            this.setPosition(new cc.Point(this.getPosition().x-this.velx,this.getPosition().y-this.vely))
            if(this.getPositionY() < 30 && this.alive)
            {
                this.kill();
            }
        });
        */
    },
    update:function(dt){
        this.setPosition(new cc.Point(this.getPosition().x-this.velx,this.getPosition().y-this.vely))
        if(this.getPositionY() < 30 && this.alive)
        {
            this.kill();
        }
    },
    collideRect:function(p){
        if(this.alive == false)
            return cc.rect(30000,30000,1,1)
        var a = this.getContentSize();
        return cc.rect(p.x - a.width/2, p.y - a.height/2,a.width,a.height);
    },
    kill:function(){
        this.alive = false;
        navesKill++;
        cc.log(navesKill);
        this.velx = 0;
        this.vely = 0;
        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames("assets/explosao1.plist", "assets/explosao1.png");
        var iFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("explosao1.png");
        this.initWithSpriteFrame(iFrame);
        var animFrames = [];
        var str = "";
        for (var i = 1; i <= 3; i++) {
            str = "explosao" + i + ".png";
            var frame = cache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.1);
        var action = cc.Animate.create(animation);
        cc.AudioEngine.getInstance().setEffectsVolume(0.1);
        cc.AudioEngine.getInstance().playEffect("bomb",false);
        //bombSFX.play();
        this.runAction(action);
        this.schedule(function(){
            if(action.isDone())
            {
                this.removeFromParent(true);
                this.setPosition(1000,1000);
            }
        })
    }
});

