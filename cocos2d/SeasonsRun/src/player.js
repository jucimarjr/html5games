var Player = cc.Armature.extend({

    id: null,
    body: null,
    body2: null,
    tag: null,
    distance: null,
    onGround: null,
    rolling: null,
    times: [],
    isRemote: null,
    
    ctor: function (posX, posY, isRemote) {

        this._super();
        this.init("RunnerFinal");
        this.tag = "Player";
        this.distance = 0;
        this.onGround = true;
        this.rolling = false;
        this.setScale(0.6);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.setPosition(cc.p(posX, posY));
        this.isRemote = isRemote;
        if (!isRemote) {
            var shape = new b2PolygonShape();
            shape.SetAsBox(20 / PTM_RATIO, 35 / PTM_RATIO);
            this.body = createBody(cc.p(posX, posY), shape, this, "dynamic", { density: 1.0, friction: 0.5, restitution: 0.0 }, PLAYER_GROUP, null);
            this.body.SetFixedRotation(true);
            this.body.SetSleepingAllowed(false);
/*
            shape.SetAsBox(20 / PTM_RATIO, 20 / PTM_RATIO);
            this.body2 = createBody(cc.p(posX, posY), shape, this, "dynamic", { density: 1.0, friction: 0.5, restitution: 0.0 }, PLAYER_GROUP, null);
            this.body2.SetFixedRotation(true);
            this.body2.SetSleepingAllowed(false);
*/
        }
    },

    land: function () {
        this.onGround = true;
        this.getAnimation().play("land");
        if(socket)
            socket.emit("change animation", { animation: "land" });
    },

    roll: function () {
        if (this.onGround && !this.rolling) {
            if (this.body.GetLinearVelocity().y > -0.5 && this.body.GetLinearVelocity().y < 0.5) {
                this.rolling = true;
                this.getAnimation().play("roll");
                this.body.SetActive(false);
            }
        }
    },
        
    jump: function () {
        if (this.onGround && !this.rolling) {
            cc.AudioEngine.getInstance().playEffect("res/audios/jump.wav");
            this.getAnimation().play("jump");
            this.body.ApplyImpulse(new b2Vec2(0, this.body.GetMass() * 10), this.body.GetWorldCenter());
            //this.body2.ApplyImpulse(new b2Vec2(0, this.body2.GetMass() * 10), this.body2.GetWorldCenter());
            this.onGround = false;
            if(socket)
                socket.emit("change animation", { animation: "jump" });
        }
    },  

});