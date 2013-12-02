// Generated by CoffeeScript 1.6.3
/* ENGINE*/

var ArrowKeyInputComponent, CanvasRenderSystem, ColorComponent, Component, EntityManager, FroggerMovementComponent, Game, HorizontalMovementComponent, InputSystem, MovementSystem, PositionComponent, RotationComponent, ShapeRendererComponent, System, VelocityComponent, genUUID, _ref,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

genUUID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);
    });;
};

EntityManager = (function() {
  function EntityManager() {
    this.id = genUUID();
    this.componentStores = {};
  }

  EntityManager.prototype.createEntity = function() {
    return genUUID();
  };

  EntityManager.prototype.addComponent = function(entity, component) {
    var store;
    if (!(component.name in this.componentStores)) {
      this.componentStores[component.name] = {};
    }
    store = this.componentStores[component.name];
    if (entity in store) {
      if (__indexOf.call(store[entity], component) < 0) {
        return store[entity].push(component);
      }
    } else {
      return store[entity] = [component];
    }
  };

  EntityManager.prototype.createEntityWithComponents = function(components) {
    var component, entity, _i, _len;
    entity = this.createEntity();
    for (_i = 0, _len = components.length; _i < _len; _i++) {
      component = components[_i];
      this.addComponent(entity, component);
    }
    return entity;
  };

  EntityManager.prototype.hasComponent = function(entity, componentName) {
    var store;
    if (!(componentName in this.componentStores)) {
      return false;
    } else {
      store = this.componentStores[componentName];
      return entity in store && store[entity].length > 0;
    }
  };

  EntityManager.prototype.getEntitiesWithComponent = function(componentName) {
    if (componentName in this.componentStores) {
      return Object.keys(this.componentStores[componentName]);
    } else {
      return [];
    }
  };

  EntityManager.prototype.getEntitiesWithComponents = function(componentNames) {
    var allEntities, componentName, count, entity, numComponents, result, _i, _j, _len, _len1, _ref;
    allEntities = {};
    numComponents = componentNames.length;
    for (_i = 0, _len = componentNames.length; _i < _len; _i++) {
      componentName = componentNames[_i];
      _ref = this.getEntitiesWithComponent(componentName);
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        entity = _ref[_j];
        if (entity in allEntities) {
          allEntities[entity]++;
        } else {
          allEntities[entity] = 1;
        }
      }
    }
    result = [];
    for (entity in allEntities) {
      count = allEntities[entity];
      if (count === numComponents) {
        result.push(entity);
      }
    }
    return result;
  };

  EntityManager.prototype.getComponent = function(entity, componentName) {
    var components, store;
    if (!(componentName in this.componentStores)) {
      return null;
    }
    store = this.componentStores[componentName];
    components = store[entity];
    if (components && components.length > 0) {
      return components[0];
    } else {
      return null;
    }
  };

  EntityManager.prototype.getComponents = function(entity, componentName) {
    var components, store;
    if (!(componentName in this.componentStores)) {
      return null;
    }
    store = this.componentStores[componentName];
    components = store[entity];
    if (components) {
      return components;
    } else {
      return [];
    }
  };

  EntityManager.prototype.save = function() {
    return JSON.stringify(this.componentStores);
  };

  EntityManager.prototype.load = function(jsonString) {
    return this.componentStores = JSON.parse(jsonString);
  };

  return EntityManager;

})();

Component = (function() {
  function Component(name) {
    this.name = name;
    this.id = genUUID();
  }

  return Component;

})();

System = (function() {
  function System() {}

  System.prototype.update = function(delta, entityManager) {
    throw 'Update must be implemented.';
  };

  return System;

})();

/* COMPONENTS*/


PositionComponent = (function(_super) {
  __extends(PositionComponent, _super);

  function PositionComponent(x, row) {
    this.x = x;
    this.row = row;
    PositionComponent.__super__.constructor.call(this, 'PositionComponent');
  }

  return PositionComponent;

})(Component);

RotationComponent = (function(_super) {
  __extends(RotationComponent, _super);

  function RotationComponent(angle) {
    this.angle = angle;
    RotationComponent.__super__.constructor.call(this, 'RotationComponent');
  }

  return RotationComponent;

})(Component);

FroggerMovementComponent = (function(_super) {
  __extends(FroggerMovementComponent, _super);

  function FroggerMovementComponent() {
    _ref = FroggerMovementComponent.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return FroggerMovementComponent;

})(Component);

HorizontalMovementComponent = (function(_super) {
  __extends(HorizontalMovementComponent, _super);

  function HorizontalMovementComponent(direction) {
    this.direction = direction;
    HorizontalMovementComponent.__super__.constructor.call(this, 'HorizontalMovementComponent');
  }

  return HorizontalMovementComponent;

})(Component);

ColorComponent = (function(_super) {
  __extends(ColorComponent, _super);

  function ColorComponent(color) {
    this.color = color;
    ColorComponent.__super__.constructor.call(this, 'ColorComponent');
  }

  return ColorComponent;

})(Component);

VelocityComponent = (function(_super) {
  __extends(VelocityComponent, _super);

  function VelocityComponent(maxSpeed) {
    this.maxSpeed = maxSpeed;
    this.dx = this.dy = 0;
    VelocityComponent.__super__.constructor.call(this, 'VelocityComponent');
  }

  return VelocityComponent;

})(Component);

ShapeRendererComponent = (function(_super) {
  __extends(ShapeRendererComponent, _super);

  function ShapeRendererComponent(width, height, type) {
    this.width = width;
    this.height = height;
    this.type = type;
    ShapeRendererComponent.__super__.constructor.call(this, 'ShapeRendererComponent');
  }

  return ShapeRendererComponent;

})(Component);

ArrowKeyInputComponent = (function(_super) {
  __extends(ArrowKeyInputComponent, _super);

  function ArrowKeyInputComponent() {
    this.left = this.right = this.up = this.down = false;
    ArrowKeyInputComponent.__super__.constructor.call(this, 'ArrowKeyInputComponent');
  }

  return ArrowKeyInputComponent;

})(Component);

/* SYSTEMS*/


CanvasRenderSystem = (function(_super) {
  __extends(CanvasRenderSystem, _super);

  function CanvasRenderSystem(cq) {
    this.cq = cq;
  }

  CanvasRenderSystem.prototype.update = function(delta, entityManager) {
    var color, entities, entity, position, shape, _i, _len, _results;
    entities = entityManager.getEntitiesWithComponents(['PositionComponent', 'ColorComponent', 'ShapeRendererComponent']);
    _results = [];
    for (_i = 0, _len = entities.length; _i < _len; _i++) {
      entity = entities[_i];
      position = entityManager.getComponent(entity, 'PositionComponent');
      shape = entityManager.getComponent(entity, 'ShapeRendererComponent');
      color = entityManager.getComponent(entity, 'ColorComponent');
      this.cq.fillStyle(color.color);
      switch (shape.type) {
        case 'rectangle':
          _results.push(this.cq.fillRect(position.x, position.row * Game.GRID_SIZE, shape.width, shape.height));
          break;
        default:
          throw 'NotImplementedException';
      }
    }
    return _results;
  };

  return CanvasRenderSystem;

})(System);

InputSystem = (function() {
  function InputSystem() {}

  InputSystem.prototype.updateKey = function(key, value, entityManager) {
    var arrows, entities, entity, _i, _len, _results;
    entities = entityManager.getEntitiesWithComponent('ArrowKeyInputComponent');
    _results = [];
    for (_i = 0, _len = entities.length; _i < _len; _i++) {
      entity = entities[_i];
      arrows = entityManager.getComponent(entity, 'ArrowKeyInputComponent');
      switch (key) {
        case 'left':
          _results.push(arrows.left = value);
          break;
        case 'right':
          _results.push(arrows.right = value);
          break;
        case 'up':
          _results.push(arrows.up = value);
          break;
        case 'down':
          _results.push(arrows.down = value);
          break;
        default:
          _results.push(void 0);
      }
    }
    return _results;
  };

  return InputSystem;

})();

MovementSystem = (function() {
  function MovementSystem() {}

  MovementSystem.prototype.update = function(delta, entityManager) {
    var arrows, entities, entity, position, velocity, _i, _len, _results;
    entities = entityManager.getEntitiesWithComponents(['PositionComponent', 'VelocityComponent', 'ArrowKeyInputComponent']);
    _results = [];
    for (_i = 0, _len = entities.length; _i < _len; _i++) {
      entity = entities[_i];
      position = entityManager.getComponent(entity, 'PositionComponent');
      velocity = entityManager.getComponent(entity, 'VelocityComponent');
      arrows = entityManager.getComponent(entity, 'ArrowKeyInputComponent');
      velocity.dx = velocity.dy = 0;
      if (arrows.left) {
        velocity.dx -= velocity.maxSpeed * delta;
      }
      if (arrows.right) {
        velocity.dx += velocity.maxSpeed * delta;
      }
      if (arrows.up) {
        velocity.dy -= velocity.maxSpeed * delta;
      }
      if (arrows.down) {
        velocity.dy += velocity.maxSpeed * delta;
      }
      position.x += velocity.dx;
      _results.push(position.y += velocity.dy);
    }
    return _results;
  };

  return MovementSystem;

})();

Game = (function() {
  Game.SCREEN_WIDTH = 640;

  Game.SCREEN_HEIGHT = 480;

  Game.GRID_SIZE = 32;

  Game.ROW_COUNT = 13;

  function Game() {
    var background, player,
      _this = this;
    this.entityManager = new EntityManager();
    this.cq = cq(Game.SCREEN_WIDTH, Game.SCREEN_HEIGHT).appendTo('body');
    background = this.entityManager.createEntity();
    this.entityManager.addComponent(background, new PositionComponent(0, 0));
    this.entityManager.addComponent(background, new ColorComponent('#8BB54A'));
    this.entityManager.addComponent(background, new ShapeRendererComponent(Game.SCREEN_WIDTH, Game.SCREEN_HEIGHT, 'rectangle'));
    player = this.entityManager.createEntityWithComponents([new PositionComponent(Game.SCREEN_WIDTH / 2, Game.ROW_COUNT - 1), new ShapeRendererComponent(Game.GRID_SIZE, Game.GRID_SIZE, 'rectangle'), new ColorComponent('#33ff33'), new VelocityComponent(0.4), new ArrowKeyInputComponent()]);
    this.canvasRenderSystem = new CanvasRenderSystem(this.cq);
    this.inputSystem = new InputSystem();
    this.movementSystem = new MovementSystem();
    this.cq.framework({
      onstep: function(delta, time) {
        return _this.movementSystem.update(delta, _this.entityManager);
      },
      onrender: function(delta, time) {
        return _this.canvasRenderSystem.update(delta, _this.entityManager);
      },
      onresize: function(width, height) {},
      onousedown: function(x, y) {},
      onmouseup: function(x, y) {},
      onmousemove: function(x, y) {},
      onmousewheel: function(delta) {},
      ontouchstart: function(x, y, touches) {},
      ontouchend: function(x, y, touches) {},
      ontouchmove: function(x, y, touches) {},
      onkeydown: function(key) {
        return _this.inputSystem.updateKey(key, true, _this.entityManager);
      },
      onkeyup: function(key) {
        _this.inputSystem.updateKey(key, false, _this.entityManager);
        if (key === 'space') {
          localStorage.setItem('save', _this.entityManager.save());
        }
        if (key === 'escape') {
          return _this.entityManager.load(localStorage.getItem('save'));
        }
      },
      ongamepaddown: function(button, gamepad) {},
      ongamepadup: function(button, gamepad) {},
      ongamepadmove: function(xAxis, yAxis, gamepad) {},
      ondropimage: function(image) {}
    });
  }

  return Game;

})();

window.game = new Game();

"Behaviors:\n    Move the car up/left/right/down\n    Move dinosaurs horizontally across the screen\n    The player dies when hit\n    Collision between car and dinosaur\n    Fuel meter that goes down when you drive, you explode if you run out\n    The player wins when reaching a tunnel at the top\n\n\n\nComponents\n    Cell Position:\n        col: int\n        row: int\n\n    Screen Position:\n        x: int\n        y: int\n\n    Color:\n        color: string\n\n    Rotation:\n        angle: float\n\n    Fuel Level:\n        amount: int\n        capacity: int\n\n    ShapeRenderer:\n        width: int\n        height: int\n        shape: enum{Rectangle, Triangle, Ellipse}\n\n    Exit:\n        col: int\n        row: int\n\nEntities:\n    player\n    dinosaurs\n\n";
