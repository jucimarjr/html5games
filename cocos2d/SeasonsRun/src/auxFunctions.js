function createBodyFromTile(object, beginPos) {

    var shape;
    var physics = { density: object.density, friction: object.friction, restitution: object.restitution };
    var sprite = null;
    if (typeof object.sprite != "undefined") {
        sprite = cc.Sprite.create("res/images/" + object.sprite);
        layerSprite.addChild(sprite);
    }

    if (object.type == "edgeShape") {
        shape = new b2PolygonShape();
        var polylinePoints = [];
        for (var i = 1 ; i < object.polylinePoints.length ; i++) {
            var v1 = new b2Vec2((parseInt(object.polylinePoints[i - 1].x) + parseInt(object.x) + beginPos.x) / PTM_RATIO, (parseInt(-object.polylinePoints[i - 1].y) + parseInt(object.y) + beginPos.y) / PTM_RATIO);
            var v2 = new b2Vec2((parseInt(object.polylinePoints[i].x) + parseInt(object.x) + beginPos.x) / PTM_RATIO, (parseInt(-object.polylinePoints[i].y) + parseInt(object.y) + beginPos.y) / PTM_RATIO);
            shape.SetAsEdge(v1, v2);
            if (typeof object.motion != "undefined")
                createBody(cc.p(0, 0), shape, sprite, object.motion, physics, null);
            else
                createBody(cc.p(0, 0), shape, sprite, object.motion, physics, null);
        }
    }

    if (object.type == "polygonShape") {
        shape = new b2PolygonShape();
        var polygonPoints = [];
        for (var i in object.polygonPoints)
            polygonPoints.push(new b2Vec2((parseInt(object.polygonPoints[i].x) + parseInt(object.x) + beginPos.x) / PTM_RATIO, (parseInt(-object.polygonPoints[i].y) + parseInt(object.y) + beginPos.y) / PTM_RATIO));
        shape.SetAsArray(polygonPoints, polygonPoints.length);
        createBody(cc.p(0, 0), shape, sprite, object.motion, physics, null);
    }

    if (object.type == "rectangleShape") {
        shape = new b2PolygonShape();
        shape.SetAsBox(object.width / PTM_RATIO, object.height / PTM_RATIO);
        createBody(cc.p(object.x + beginPos.x, object.y + beginPos.y), shape, sprite, object.motion, physics, null);
    }

    if (object.type == "circleShape") {
        shape = new b2CircleShape();
        shape.m_radius = (object.width / 2) / PTM_RATIO;
        createBody(cc.p(object.x + beginPos.x, object.y + beginPos.y), shape, sprite, object.motion, physics, null);
    }

};

function createBody(position, shape, object, type, physics, group) {

    var bodyDef = new b2BodyDef();
    if (type == "dynamic")
        bodyDef.type = b2Body.b2_dynamicBody;
    if (type == "static")
        bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.Set(position.x / PTM_RATIO, position.y / PTM_RATIO);
    bodyDef.userData = object;

    shapeDef = new b2FixtureDef();
    shapeDef.shape = shape
    if (group != null)
        shapeDef.filter.groupIndex = group;
    if (physics) {
        shapeDef.density = physics.density;
        shapeDef.friction = physics.friction;
        shapeDef.restitution = physics.restitution;
    }
    var body = world.CreateBody(bodyDef);
    body.CreateFixture(shapeDef);

    return body;

};