var Missil = cc.Sprite.extend({
        alive:true,
        y:0,
        ctor:function(){
            this._super();
            this.initWithFile("missil.png");
            this.setPosition(new cc.Point(tela.width/2, tela.height/12 - 5));
            cc.AudioEngine.getInstance().setEffectsVolume(0.1);
            cc.AudioEngine.getInstance().playEffect("missil",false);
            //missilSFX.play();
        },
        handleTouch:function(touchLocation)
        {
            var x = touchLocation.x;
            var y = touchLocation.y;
            this.y = y;
            var angle = ((Math.atan2((400 - x),(75 - y)) * 180) / Math.PI)+180;
            this.setRotation(angle);
            var velx = (x-400)*(x-400);
            var vely = (y-75)*(y-75);
            var t = Math.sqrt(velx+vely);
            var ver = true
            var move = new cc.MoveTo.create(t/500, new cc.p(x+2,y+2));
            this.runAction(move);
            //this.scheduleUpdate();

            this.schedule(function(){
                if(this.getPosition().y > y && ver)
                {
                    this.kill();
                    ver = false;
                }
            });

        },
        update:function(){
            if(this.getPosition().y > this.y && ver)
            {
                this.kill();
                ver = false;
            }
        },
        collideRect:function(p){
            if(this.alive == false)
                return cc.rect(60000,60000,1,1)
            var a = this.getContentSize();
            return cc.rect(p.x - a.width, p.y - a.height,a.width,a.height);
        },
        kill:function(){
            this.stopAllActions();
            var cache = cc.SpriteFrameCache.getInstance();
            cache.addSpriteFrames("explosao.plist", "explosao.png");
            var iFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("explosao1.png");
            this.initWithSpriteFrame(iFrame);
            var animFrames = [];
            var str = "";
            for (var i = 1; i <= 14; i++) {
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
                    this.setPosition(-1000,-1000);
                    this.alive = false;
                }
            })
        }
    });





