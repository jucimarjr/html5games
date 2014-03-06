/*************************************************************************************************************************************/
//Inicia o Layer do Jogo
/*************************************************************************************************************************************/

var screen = null;
var socket;
var localPlayer = null;
var remotePlayers = [];

var layerGame = null;
var layerSprite = null;
var _tilemaps = [];
var tileMapSize = 4400;

var world = null;
var PTM_RATIO = 30.0;
var ACTUAL_LAYER = 1;
var loopNumber;
var addLayer;

var tileMapsInScene = [];
var PLAYER_GROUP = -1;
var voidNode;
var velocity;

var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Listener = Box2D.Dynamics.b2ContactListener;
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

var GameLayer = cc.LayerColor.extend({

    keyLeft: false,
    keyRight: false,
    
    init:function()
    {
        this._super();
        this.setColor(new cc.Color4B(255, 255, 255, 255));
        addLayer = true;
        loopNumber = 0;
        velocity = 5;
        this.setKeyboardEnabled(true);

        //Inicia a conexão com o servidor
        /*
        socket = io.connect("http://localhost", { port: 8080, transports: ["websocket"] });
        socket.on("connect", onSocketConnected);
        socket.on("disconnect", onSocketDisconnect);
        socket.on("new player", onNewPlayer);
        socket.on("move player", onMovePlayer);
        socket.on("stop player", onStopPlayer);
        socket.on("jump player", onJumpPlayer);
        socket.on("remove player", onRemovePlayer);
        */

        //Pega o tamanho da tela
        screen = cc.Director.getInstance().getWinSize();

        //Cria o Layer do jogo
        layerSprite = cc.Layer.create(0, 480);
        layerGame = cc.Layer.create(0, 480);
        
        //Configura o Box2D
        world = new b2World(new b2Vec2(0, -20), true);
        
        var listener = new b2Listener;
        listener.BeginContact = this.contactHandle;
        world.SetContactListener(listener);
                
        //Tile Maps
        _tilemaps.push("res/Maps/map1.tmx");
        _tilemaps.push("res/Maps/map2.tmx");
                
        //Cria o personagem local
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/Runner/Runner0.png", "res/Runner/Runner0.plist", "res/Runner/Runner.ExportJson");
        localPlayer = new Player(50, 200);
        layerSprite.addChild(localPlayer);
        
        voidNode = cc.ParallaxNode.create();
        voidNode.addChild(layerGame, -1, cc.p(1.0, 1.0), cc.p(0, 0));
        this.addChild(voidNode);
        this.addChild(layerSprite);
        
        //Adiciona o Layer do jogo
        setInterval(this.updateSpritePosition, 20);
        return true;
    },

    contactHandle: function (contact) {

        var bodyA = contact.GetFixtureA().GetBody();
        var bodyB = contact.GetFixtureB().GetBody();

    },

    onKeyDown: function (e) {
        
        if (e == cc.KEY.up) {
            localPlayer.jump();
            //socket.emit("jump player", {});
        }

    },
        
    updateSpritePosition: function () {

        world.Step(1 / 40, 3, 5);

        //Verifica se o jogador está no chão
        if (localPlayer.body.GetLinearVelocity().y > 2 && localPlayer.getAnimation().getCurrentMovementID() == "run") {
            localPlayer.getAnimation().play("jump");
            localPlayer.onGround = false;
        }

        if (localPlayer.body.GetLinearVelocity().y > -1 && localPlayer.body.GetLinearVelocity().y < 1) {
            if (localPlayer.getAnimation().getCurrentMovementID() == "") {
                if (!localPlayer.onGround)
                    localPlayer.land();
                else
                    localPlayer.getAnimation().play("run");
            }
        } 
        
        //Faz o mapa andar

        var playerVelocity = localPlayer.body.GetLinearVelocity().x;
        if (playerVelocity < 0)
            playerVelocity = 0;
        voidNode.setPosition(cc.p(voidNode.getPosition().x - (velocity + playerVelocity), voidNode.getPosition().y));
        
        //Remove layer anterior
        if (tileMapsInScene.length == 3) {
            layerGame.removeChild(tileMapsInScene[0], true);
            tileMapsInScene[0].release();
            tileMapsInScene.splice(0, 1);
            cc.TextureCache.getInstance().removeTexture(tileMapsInScene[0]);
        }
        
        //Adiciona os mapas de tempo em tempo
        if ((voidNode.getPosition().x * -1) > ((tileMapSize * loopNumber)) - 800 ) {
            var randomNumber = Math.floor(Math.random() * _tilemaps.length);
            var _tileMap = cc.TMXTiledMap.create(_tilemaps[randomNumber]);
            _tileMap.retain();

            _tileMap.setPosition(cc.p(tileMapSize * loopNumber, 0));
            tileMapsInScene.push(_tileMap);
            layerGame.addChild(_tileMap);

            var objectGroup = _tileMap.getObjectGroup("objects").getObjects();
            for (var i in objectGroup) {
                if (loopNumber == 0)
                    createBodyFromTile(objectGroup[i], cc.p(0, 0));
                else
                    createBodyFromTile(objectGroup[i], cc.p(800, 0));
            }
            loopNumber++;
        }
                
        //Atualiza os corpos de acordo com a posição do Node

        for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
            if (b.GetUserData() != null) {
                var bodySprite = b.GetUserData();
                if (bodySprite.tag == "Player") {
                    if (b.GetPosition().x < 150 / PTM_RATIO)
                        b.SetLinearVelocity(new b2Vec2(2, b.GetLinearVelocity().y));
                    if (b.GetPosition().x > 150 / PTM_RATIO)
                        b.SetPosition(cc.p(150 / PTM_RATIO, b.GetPosition().y));
                } else
                    b.SetPosition(cc.p(b.GetPosition().x - (velocity + playerVelocity)/ PTM_RATIO, b.GetPosition().y));
                bodySprite.setPosition(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO);
                bodySprite.setRotation(b.GetAngle() * 180 * -1 / Math.PI);
            } else
                b.SetPosition(cc.p(b.GetPosition().x - (velocity + playerVelocity) / PTM_RATIO, b.GetPosition().y));
            if ((b.GetPosition().x + b.width) < localPlayer.body.GetPosition().x - 100)
                world.DestroyBody(b);
        }
        
    },
    
});

var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});