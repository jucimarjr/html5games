/*************************************************************************************************************************************/
//Inicia o Layer do Jogo
/*************************************************************************************************************************************/

var screen = null;
var socket = null;
var localPlayer = null;

var remotePlayers = [];
var distanceLabel = null;
var timeLabel = null;

var layerGame = null;
var layerSprite = null;
var _tilemaps = [];
var tileMapSize = 4400;

var world = null;
var PTM_RATIO = 30.0;
var ACTUAL_LAYER = 1;
var loopNumber;
var accelerate = false;
var nextMap = [];
var lapTime = null;

var tileMapsInScene = [];
var PLAYER_GROUP = -1;
var MENUMAP_TAG = 10;
var voidNode;
var velocity;
var updateThread = null;

var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Listener = Box2D.Dynamics.b2ContactListener;
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

var GameLayer = cc.LayerGradient.extend({

    keyLeft: false,
    keyRight: false,
    
    init:function()
    {
        this._super();
        this.setStartColor(new cc.Color4B(30, 68, 211, 255));
        this.setEndColor(new cc.Color4B(111, 161, 197, 255));
        
        //Pega o tamanho da tela
        screen = cc.Director.getInstance().getWinSize();

        //Cria o Layer do jogo
        layerSprite = cc.Layer.create(0, 480);
        layerGame = cc.Layer.create(0, 480);
                
        //Tile Maps
        _tilemaps.push("res/Maps/map3.tmx");
        _tilemaps.push("res/Maps/map1.tmx");
        _tilemaps.push("res/Maps/map2.tmx");
        _tilemaps.push("res/Maps/map4.tmx");
        _tilemaps.push("res/Maps/map5.tmx");
        _tilemaps.push("res/Maps/map6.tmx");
        _tilemaps.push("res/Maps/map7.tmx");
        _tilemaps.push("res/Maps/map8.tmx");
        //_tilemaps.push("res/Maps/map9.tmx");
        //_tilemaps.push("res/Maps/map10.tmx");

        //Cria o primeiro mapa
        var _tileMap = cc.TMXTiledMap.create(_tilemaps[0]);
        _tileMap.retain();
        _tileMap.setPosition(cc.p(0, 0));
        layerGame.addChild(_tileMap,0,MENUMAP_TAG);
        
        //Configura o Box2D
        world = new b2World(new b2Vec2(0, -20), true);

        //Cria o personagem local
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/Runner/Runner0.png", "res/Runner/Runner0.plist", "res/Runner/Runner.ExportJson");
        localPlayer = new Player(100, 163, false);
        layerSprite.addChild(localPlayer);
        
        voidNode = cc.ParallaxNode.create();
        voidNode.addChild(layerGame, -1, cc.p(1.0, 1.0), cc.p(0, 0));
        this.addChild(voidNode);
        this.addChild(layerSprite);      

        return true;
    },

    initGame: function () {
        loopNumber = 0;
        velocity = 5;
        lapTime = new Date();
        lapTime.setMinutes(0);
        lapTime.setSeconds(0);
        lapTime.setMilliseconds(0);
        nextMap.push(0);
        this.setKeyboardEnabled(true);
        
        //Inicia a conexão com o servidor
        if (localStorage["gameType"] == "multi") {
            try {
                socket = io.connect("http://192.168.0.22/", { port: 8080, transports: ["websocket"], 'force new connection':true });
                socket.on("connect", onSocketConnected);
                socket.on("disconnect", onSocketDisconnect);
                socket.on("new player", onNewPlayer);
                socket.on("move player", onMovePlayer);
                socket.on("remove player", onRemovePlayer);
                socket.on("change animation", onChangeAnimation);
                socket.on("next map", onNextMap);
            } catch (e) {
                alert("Error: Server not found");
            }
        }

        //Coloca a pontuação na tela        
        timeLabel = cc.LabelTTF.create("00:00:00", "GhoulySolidRegular", 20);
        timeLabel.setPosition(new cc.Point(screen.width - 70, screen.height - 80));
        timeLabel.setColor(new cc.Color4B(0, 0, 0, 255));
        layerSprite.addChild(timeLabel);
        
        distanceLabel = cc.LabelTTF.create("0m", "GhoulySolidRegular", 40);
        distanceLabel.setPosition(new cc.Point(screen.width - 70, screen.height - 40));
        distanceLabel.setColor(new cc.Color4B(0, 0, 0, 255));
        layerSprite.addChild(distanceLabel);
        
        var listener = new b2Listener;
        listener.BeginContact = this.contactHandle;
        world.SetContactListener(listener);

        setTimeout(function (updateGame) {

            var label = cc.LabelTTF.create("START!", "GhoulySolidRegular", 70);
            label.setPosition(new cc.Point(screen.width / 2, screen.height / 2));
            label.setColor(new cc.Color4B(0, 0, 0, 255));

            label.runAction(cc.FadeIn.create(3.0));
            label.runAction(cc.ScaleTo.create(1.5, 1.5));
            label.runAction( cc.Sequence.create( cc.FadeOut.create(1.0) , cc.CallFunc.create( function(label){ layerSprite.removeChild(label) } , label ) ) );

            layerSprite.addChild(label);

            updateThread = setInterval(updateGame, 20);
        }, 2000, this.updateGame);

    },

    contactHandle: function (contact) {

        var bodyA = contact.GetFixtureA().GetBody();
        var bodyB = contact.GetFixtureB().GetBody();

    },

    onKeyDown: function (e) {
        
        if (e == cc.KEY.up)
            localPlayer.jump();

        if (e == cc.KEY.space)            
            if (localPlayer.onGround && localPlayer.getAnimation().getCurrentMovementID() == "run")
                accelerate = true;

    },
        
    onKeyUp: function (e) {

        if (e == cc.KEY.space)
            accelerate = false;

    },

    updateGame: function () {

        world.Step(1 / 40, 3, 5);

        //Manda a posição para os outros jogadores
        if (socket)
            socket.emit("move player", { x: ( voidNode.getPosition().x * -1 ) + localPlayer.getPosition().x , y: localPlayer.getPosition().y });

        //Acelera o personagem
        if (accelerate) {
            if (localPlayer.body.GetLinearVelocity().x < 6)
                localPlayer.body.SetLinearVelocity(new b2Vec2(localPlayer.body.GetLinearVelocity().x + 0.1, localPlayer.body.GetLinearVelocity().y));
        } else {
            if (localPlayer.body.GetLinearVelocity().x > 2 && localPlayer.onGround)
                localPlayer.body.SetLinearVelocity(new b2Vec2(localPlayer.body.GetLinearVelocity().x - 0.1, localPlayer.body.GetLinearVelocity().y));
        }

        //Verifica se o jogador está no chão
        if (localPlayer.body.GetLinearVelocity().y > 2 && localPlayer.getAnimation().getCurrentMovementID() == "run") {
            localPlayer.getAnimation().play("jump");
            localPlayer.onGround = false;
            if(socket)
                socket.emit("change animation", { animation: "jump" });
        }

        if (localPlayer.body.GetLinearVelocity().y > -1 && localPlayer.body.GetLinearVelocity().y < 1) {
            if (localPlayer.getAnimation().getCurrentMovementID() == "") {
                if (!localPlayer.onGround)
                    localPlayer.land();
                else {
                    localPlayer.getAnimation().play("run");
                    if(socket)
                        socket.emit("change animation", { animation: "run" });
                }
            }
        } 
        
        //Faz o mapa andar

        var playerVelocity = localPlayer.body.GetLinearVelocity().x;
        if (playerVelocity < 0)
            playerVelocity = 0;
        voidNode.setPosition(cc.p(voidNode.getPosition().x - (velocity + playerVelocity), voidNode.getPosition().y));
        
        //Atualiza os dados
        localPlayer.distance += (( playerVelocity + velocity ) / 100);
        distanceLabel.setString(localPlayer.distance.toFixed(1)+"m", 40);

        lapTime.setMilliseconds(lapTime.getMilliseconds() + 20);
        var minutesLabel = lapTime.getMinutes();
        if (minutesLabel < 10)
            minutesLabel = "0" + minutesLabel.toString();
        var secondsLabel = lapTime.getSeconds();
        if (secondsLabel < 10)
            secondsLabel = "0" + secondsLabel.toString();
        timeLabel.setString(minutesLabel + ":" + secondsLabel + ":" + lapTime.getMilliseconds() / 10, 20);

        //Remove layer anterior
        if (tileMapsInScene.length == 3) {
            layerGame.removeChild(tileMapsInScene[0], true);
            tileMapsInScene[0].release();
            tileMapsInScene.splice(0, 1);
            cc.TextureCache.getInstance().removeTexture(tileMapsInScene[0]);
        }
        
        //Adiciona os mapas de tempo em tempo
        if ((voidNode.getPosition().x * -1) > ((tileMapSize * loopNumber)) - 800) {

            var randomNumber;
            if (nextMap.length == 0) {
                randomNumber = Math.floor(Math.random() * _tilemaps.length);
                if(socket)
                    socket.emit("next map", { index: randomNumber });
            } else {
                randomNumber = nextMap[0];
                nextMap.splice(0, 1);
            }

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
                    if (b.GetPosition().x < -30 / PTM_RATIO || b.GetPosition().y < -50 / PTM_RATIO)
                        endGame();
                    else {
                        if (b.GetPosition().x < 150 / PTM_RATIO)
                            b.SetLinearVelocity(new b2Vec2(2, b.GetLinearVelocity().y));
                        if (b.GetPosition().x > 150 / PTM_RATIO)
                            b.SetPosition(cc.p(150 / PTM_RATIO, b.GetPosition().y));
                    }
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

function endGame() {
    clearInterval(updateThread);

    var label = cc.LabelTTF.create("Over!", "GhoulySolidRegular", 40);
    label.setPosition(new cc.Point(screen.width / 2, screen.height / 2));
    label.setColor(new cc.Color4B(0, 0, 0, 255));
    layerSprite.addChild(label);

    if (localPlayer.distance > parseFloat( localStorage["bestScore"] ))
        localStorage["bestScore"] = localPlayer.distance.toFixed(1);

    label = cc.LabelTTF.create(localPlayer.distance.toFixed(1)+"m", "GhoulySolidRegular", 40);
    label.setPosition(new cc.Point(screen.width / 2, screen.height / 2 - 50));
    label.setColor(new cc.Color4B(0, 0, 0, 255));
    layerSprite.addChild(label);
        
    if (socket)
        socket.disconnect();

    setTimeout(function () {
        var scene = cc.Scene.create();
        scene.addChild(new Menu());
        cc.Director.getInstance().replaceScene(cc.TransitionFadeBL.create(1.5, scene));
    }, 3000);

};

var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        layer.initGame();
        this.addChild(layer);
    }
});