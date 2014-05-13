function createBodyFromTile(object, beginPos) {

    var shape;
    var physics = { density: object.density, friction: object.friction, restitution: object.restitution, sensor: object.sensor, bodyTag: object.objectTag , speedX: object.speedX , speedY: object.speedY};
    var sprite = null;
    var group = null;
    if (typeof object.sprite != "undefined") {
        sprite = cc.Sprite.create("res/images/" + object.sprite);
        sprite.retain();
        layerSprite.addChild(sprite);
        spritesToDestroy.push(sprite);
    }
    if (typeof object.group != "undefined") {
        group = object.group;
    }

    if (object.type == "edgeShape") {
        shape = new b2PolygonShape();
        var polylinePoints = [];
        for (var i = 1 ; i < object.polylinePoints.length ; i++) {
            var v1 = new b2Vec2((parseInt(object.polylinePoints[i - 1].x) + parseInt(object.x) + beginPos.x) / PTM_RATIO, (parseInt(-object.polylinePoints[i - 1].y) + parseInt(object.y) + beginPos.y) / PTM_RATIO);
            var v2 = new b2Vec2((parseInt(object.polylinePoints[i].x) + parseInt(object.x) + beginPos.x) / PTM_RATIO, (parseInt(-object.polylinePoints[i].y) + parseInt(object.y) + beginPos.y) / PTM_RATIO);
            shape.SetAsEdge(v1, v2);
            objectsToDestroy.push( createBody(cc.p(0, 0), shape, sprite, object.motion, physics, group, object.tag) );
        }
    }

    if (object.type == "polygonShape") {
        shape = new b2PolygonShape();
        var polygonPoints = [];
        for (var i in object.polygonPoints)
            polygonPoints.push(new b2Vec2((parseInt(object.polygonPoints[i].x) + parseInt(object.x) + beginPos.x) / PTM_RATIO, (parseInt(-object.polygonPoints[i].y) + parseInt(object.y) + beginPos.y) / PTM_RATIO));
        shape.SetAsArray(polygonPoints, polygonPoints.length);
        objectsToDestroy.push( createBody(cc.p(0, 0), shape, sprite, object.motion, physics, group, object.tag) );
    }

    if (object.type == "rectangleShape") {
        shape = new b2PolygonShape();
        shape.SetAsBox(object.width / 2 / PTM_RATIO, object.height / 2 / PTM_RATIO);
        objectsToDestroy.push( createBody(cc.p(object.x + beginPos.x, object.y + beginPos.y), shape, sprite, object.motion, physics, group, object.tag) );
    }

    if (object.type == "circleShape") {
        shape = new b2CircleShape();
        shape.m_radius = (object.width / 2) / PTM_RATIO;
        objectsToDestroy.push( createBody(cc.p(object.x + beginPos.x, object.y + beginPos.y), shape, sprite, object.motion, physics, group, object.tag) );
    }
        
    if (object.type == "revoluteJoint") {
        var joint = new b2RevoluteJoint();
        var bodyA, bodyB;
        joint.bodyA = getBodyByTag(object.bodyA);
        joint.bodyB = getBodyByTag(object.bodyB);
        joint.localAnchorA = new b2Vec2(object.anchorAx, object.anchorAy);
        joint.localAnchorB = new b2Vec2(object.anchorBx, object.anchorBy);
        if (typeof object.motorSpeed != "undefined") {
            joint.enableMotor = true;
            joint.motorSpeed = object.motorSpeed;
            joint.maxMotorTorque = object.motorTorque;
        }
        world.CreateJoint(joint);        
    }
    
    if (object.type == "pulleyJoint") {
        var joint = new b2PulleyJoint();
        var bodyA, bodyB;
        joint.bodyA = getBodyByTag(object.bodyA);
        joint.bodyB = getBodyByTag(object.bodyB);
        joint.localAnchorA = new b2Vec2(object.anchorAx, object.anchorAy);
        joint.localAnchorB = new b2Vec2(object.anchorBx, object.anchorBy);
        world.CreateJoint(joint);
    }

};

function getBodyByTag(tag) {
    for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
        if (b.tag == tag)
            return b;
    }
}

function createBody(position, shape, object, type, physics, group, tag) {

    var bodyDef = new b2BodyDef();
    if (type == "dynamic")
        bodyDef.type = b2Body.b2_dynamicBody;
    if (type == "static")
        bodyDef.type = b2Body.b2_staticBody;
    if (type == "kinematic")
        bodyDef.type = b2Body.b2_kinematicBody;
    bodyDef.position.Set(position.x / PTM_RATIO, position.y / PTM_RATIO);
    bodyDef.userData = object;

    shapeDef = new b2FixtureDef();
    shapeDef.shape = shape;
    if (typeof physics.sensor != "undefined")
        shapeDef.isSensor = true;
    if (group != null)
        shapeDef.filter.groupIndex = group;
    if (physics) {
        shapeDef.density = physics.density;
        shapeDef.friction = physics.friction;
        shapeDef.restitution = physics.restitution;
    }
    var body = world.CreateBody(bodyDef);
    body.CreateFixture(shapeDef);
    body.tag = tag;
    body.SetSleepingAllowed(false);
    if (typeof physics.bodyTag != "undefined") {
        body.objectTag = physics.bodyTag;
        body.objectSpeedX = physics.speedX;
        body.objectSpeedY = physics.speedY;
    }

    return body;

};