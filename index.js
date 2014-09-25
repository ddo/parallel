var util   = require('util');
var events = require('events');

module.exports = Parallel;

/**
 * The easiest way to manage parallel in nodejs
 * @param {Array} funcs combine of function name and params
 *
 * events:
 *     error:   call on any error occurs
 *     success: call on any success occurs
 *     each:    call on each function is done
 *     done:    call on all the functions are done
 */
function Parallel(funcs, times) {
    if(!(this instanceof Parallel)) {
        return new Parallel(funcs, times);
    }

    if(!(funcs instanceof Array)) {
        throw new Error('invalid param');
    }

    this.funcs = funcs;

    if(this.funcs instanceof Function) {
        this.funcs = [this.funcs];
    }

    this.times = times || 1;

    this.callbacks = [];
}

util.inherits(Parallel, events.EventEmitter);

Parallel.prototype.start = function() {
    var self = this;

    for(var j = 0; j < self.times; j++) {
        for(var i = 0; i < self.funcs.length; i++) {
            var func = self.funcs[i];

            var params = func[1];

            if(!params) {
                params = [];
            } else if(!(params instanceof Array)) {
                params = [params];
            }

            params.push(self._handleCallback.bind(self));

            func[0].apply(func[0], params);
        }
    }
};

Parallel.prototype._handleCallback = function(err) {
    var self = this;

    self.callbacks.push(arguments);

    self.emit('each', arguments);

    if(err) {
        self.emit('error', err);
    } else {
        self.emit('success', arguments);
    }

    //all done
    if(self.callbacks.length >= self.funcs.length * self.times) {
        self.emit('done', self.callbacks);
        self.callbacks = [];
    }
};