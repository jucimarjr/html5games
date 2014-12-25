/*global console*/

/*Defines the object which can be enqueued*/

var QCell = function (content, next) {
    'use strict';
    this.content = content;
    this.next = next;
};

/*Defines a object to represent a queue*/

var Queue = function (maxSize) {
    'use strict';
    if (!maxSize) {
        console.error("queue.js - Queue.Queue: maxSize is not valid");
        return;
    }
    var headCell = new QCell();
    this.first = headCell;
    this.last = headCell;
    this.maxSize = maxSize;
    this.count = 0;
};

Queue.prototype = {
    makeEmpty: function () {
        'use strict';
        this.last = this.first;
        this.count = 0;
    },
    isEmpty: function () {
        'use strict';
        return (this.count === 0);
    },
    enqueue: function (event) {
        'use strict';
        if (this.count === this.maxSize) {
            console.error("queue.js - Queue.enqueue: QUEUE IS FULL");
            return;
        }
        this.count = this.count + 1;
        this.last.next = new QCell(event);
        this.last = this.last.next;
    },
    dequeue: function () {
        'use strict';
        if (this.isEmpty()) {
            console.error("queue.js - Queue.dequeue: QUEUE IS EMPTY");
            return;
        }
        this.count = this.count - 1;
        var cell = this.first.next;
        this.first = this.first.next;
        return cell.content;
    }
};