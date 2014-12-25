/*global console, Queue, States*/

/* The object that represent a transition in the finite state machine*/

var Transition = function (origin, event, destine, actions) {
    'use strict';
    if (!origin || !destine || !actions) {
        console.error("fsm.js - Transition.Transition - CONSTRUCTOR PARAMETERS NOT DEFINED");
        return;
    }
    this.origin = origin;
    this.event = event;
    this.destine = destine;
    this.actions = actions;
};

/*the object that represents the state machine, it is a singleton*/

var FSMachine = function () {
    'use strict';
    this.currentState = States.FIRST;
    this.rules = [];
    this.queue = new Queue(5);
};
FSMachine.prototype = {
    addTransition: function (origin, event, destine, actions) {
        'use strict';
        this.rules.push(new Transition(origin, event, destine, actions));
    },
    execute: function (transition) {
        'use strict';
        var i, end, action;
        end = transition.actions.length;
        for (i = 0; i < end; i = i + 1) {
            action = transition.actions[i];
            action();
        }
        this.currentState = transition.destine;
    },
    nextTransition: function () {
        'use strict';
        var i, end, flagFoundTransition = false, event = this.queue.dequeue();
        end = this.rules.length;
        for (i = 0; i < end; i = i + 1) {
            if (this.rules[i].origin === this.currentState && this.rules[i].event === event) {
                flagFoundTransition = true;
                this.execute(this.rules[i]);
            }
        }
        if (flagFoundTransition === false) {
            console.warn("fsm.js - FSMachine.nextTransition - No transition found " + this.currentState + " - " + event);
        }
    },
    enqueueEvent: function (event) {
        'use strict';
        this.queue.enqueue(event);
        this.nextTransition();
    }
};