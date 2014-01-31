var BARRA_VERMELHA = 1;
var BARRA_AZUL = 2;
var BOLA = 3;

var GAME_LAYER = 4;
var keyboardUp1 = false;
var keyboardDown1 = false;
var keyboardUp2 = false;
var keyboardDown2 = false;

var speed = 20;
var PTM_RATIO = 32.0;

var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    debugDraw = Box2D.Dynamics.b2DebugDraw;

var world;
var bodies = [];

var JogoLayer = cc.Layer.extend({
    
    init:function()
    {
        this._super();

        this.setKeyboardEnabled(true);

        var gameLayer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 500);

        var barraVermelha = cc.Sprite.create("Imagens/barras/barra_1/b1_sprite_1.png");
        var barraAzul = cc.Sprite.create("Imagens/barras/barra_2/b1_sprite_1.png");
        var bola = cc.Sprite.create("Imagens/ball.png");
                        
        gameLayer.addChild(barraVermelha, 0, BARRA_VERMELHA);
        gameLayer.addChild(barraAzul, 0, BARRA_AZUL);
        gameLayer.addChild(bola, 0, BOLA);
        
        bola.setPosition(200, 200);
        
        barraVermelha.setPosition(20, 100);
        barraAzul.setPosition(780, 200);

        bodies.push(bola);
        bodies.push(barraVermelha);
        bodies.push(barraAzul);

        //------------------------------------------BOX 2D -----------------------------------------------
                
        world = new b2World( new b2Vec2(1,0) , true );

        // Cria a bola

        var ballBodyDef = new b2BodyDef();
        ballBodyDef.type = b2Body.b2_dynamicBody;
        ballBodyDef.position.Set(200 / PTM_RATIO, 200 / PTM_RATIO);
        ballBodyDef.userData = 0;
        var body = world.CreateBody(ballBodyDef);

        var circle = new b2CircleShape();
        circle.m_radius = 30 / PTM_RATIO;

        ballShapeDef = new b2FixtureDef();
        ballShapeDef.shape = circle;
        ballShapeDef.density = 1.0;
        ballShapeDef.friction = 0.0;
        ballShapeDef.restitution = 1.1;

        body.CreateFixture(ballShapeDef);
        body.ApplyImpulse(new b2Vec2(20, -10), ballBodyDef.position);
        
        // Cria o ch�o e o teto

        var boxShapeDef = new b2FixtureDef();
        boxShapeDef.shape = new b2PolygonShape();
        var groundBodyDef = new b2BodyDef();

        boxShapeDef.shape.SetAsBox(800/PTM_RATIO, 0);        
        groundBodyDef.type = b2Body.b2_staticBody;

        groundBodyDef.position.Set(0, -20 / PTM_RATIO);
        world.CreateBody(groundBodyDef).CreateFixture(boxShapeDef);          
        
        groundBodyDef.position.Set(0, 520 / PTM_RATIO);
        world.CreateBody(groundBodyDef).CreateFixture(boxShapeDef);
        
        // Cria as barras
        
        boxShapeDef.shape.SetAsBox(38 / PTM_RATIO / 2, 198 / PTM_RATIO / 2);
        
        groundBodyDef.type = b2Body.b2_staticBody;        
        groundBodyDef.userData = 1;
        
        groundBodyDef.position.Set( 20 / PTM_RATIO , 100 / PTM_RATIO );
        world.CreateBody(groundBodyDef,"BARRA_VERMELHA").CreateFixture(boxShapeDef);

        groundBodyDef.userData = 2;
        groundBodyDef.position.Set( 780 / PTM_RATIO , 200 / PTM_RATIO );
        world.CreateBody(groundBodyDef).CreateFixture(boxShapeDef);
        
        //------------------------------------------------------------------------------------------------
                
        this.addChild(gameLayer, 0 , GAME_LAYER);
        
        setInterval(this.gameLoop, 20);
        setInterval(this.keyboardInput, 20);

    },
    
    keyboardInput: function (){
    
        if (keyboardUp1 == true && bodies[1].getPosition().y <= 390) {
            var point = new cc.Point(bodies[1].getPosition().x, bodies[1].getPosition().y + speed);
            bodies[1].setPosition(point);
            for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
                if (b.GetUserData() == 1) {
                    b.SetPosition( new cc.Point( point.x / PTM_RATIO , point.y / PTM_RATIO ));
                }
            }
        }

        if (keyboardDown1 == true && bodies[1].getPosition().y >= 100) {
            var point = new cc.Point(bodies[1].getPosition().x, bodies[1].getPosition().y - speed);
            bodies[1].setPosition(point);
            for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
                if (b.GetUserData() == 1) {
                    b.SetPosition(new cc.Point(point.x / PTM_RATIO, point.y / PTM_RATIO));
                }
            }
        }

        if (keyboardUp2 == true && bodies[2].getPosition().y <= 390) {
            var point = new cc.Point(bodies[2].getPosition().x, bodies[2].getPosition().y + speed);
            bodies[2].setPosition(point);
            for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
                if (b.GetUserData() == 2) {
                    b.SetPosition(new cc.Point(point.x / PTM_RATIO, point.y / PTM_RATIO));
                }
            }
        }

        if (keyboardDown2 == true && bodies[2].getPosition().y >= 100) {
            var point = new cc.Point(bodies[2].getPosition().x, bodies[2].getPosition().y - speed);
            bodies[2].setPosition(point);
            for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
                if (b.GetUserData() == 2) {
                    b.SetPosition(new cc.Point(point.x / PTM_RATIO, point.y / PTM_RATIO));
                }
            }
        }

    },

    gameLoop: function () {

        world.Step(1 / 40, 3, 5);
          
        for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
            if (b.GetUserData() != null && b.GetUserData() < 4) {
                var ballData = b.GetUserData();
                var bola = bodies[ballData];
                bola.setPosition(new cc.Point(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO));
                bola.rotation = -1 * b.GetAngle();
                
                if (b.GetUserData() == 0) {
                    
                    if (b.GetLinearVelocity().x < -35 || b.GetPosition().x > 35) {
                        b.m_fixtureList.SetRestitution(1.0);
                    }

                }
                
            }
        }
        
    },

    onKeyUp: function (e) {
    
        if (e == cc.KEY.up)
            keyboardUp1 = false;
        if (e == cc.KEY.down)
            keyboardDown1 = false;
        if (e == 87)
            keyboardUp2 = false;
        if (e == 83)
            keyboardDown2 = false;

    },
    
    onKeyDown: function (e) {
        
        if (e == cc.KEY.up)
            keyboardUp1 = true;
        if (e == cc.KEY.down)
            keyboardDown1 = true;
        if (e == 87)
            keyboardUp2 = true;
        if (e == 83)
            keyboardDown2 = true;
        
    },

});

var JogoScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new JogoLayer();
        layer.init();
        this.addChild(layer);
    }
});