parallel
========

> the easiest way to manage parallel in nodejs

##Quick Start

```js
var Parallel = require('Parallel');

var parallel = Parallel([
    [function1, params],
    [function2, params],
    [function3, params],
    [function4, params],
]);

//trigger on each function is done
parallel.on('each', function(err) {
});

//trigger on any function returns error
parallel.on('error', function(err) {
});

//trigger on any function returns without error
parallel.on('success', function(err) {
});

//trigger on all the functions are done
parallel.on('done', function(err) {
});

//start
parallel.start();
```

###Same function - multiple times

```js
var Parallel = require('Parallel');

var parallel = Parallel([
    [function, params],
], 5); //5 times
```

###Different functions - multiple times

```js
var Parallel = require('Parallel');

var parallel = Parallel([
    [function1, params],
    [function2, params],
    [function3, params],
    [function4, params]
], 5); //5 times
```

##Installation

    $ npm i ddo/parallel

##Init

```js
Parallel(/*funcs, times*/);
```

* ``funcs``: ``Array`` [``String``: function name, ``Array``: array of input]
* ``times``: ``Int`` how many times ?

##Events

* ``error``: when a function returns error
* ``success``: when a function returns without error
* ``each``: when each function is done
* ``done``: when all the functions are done

##Examples

```js
function async_function(timeout) {
    setTimeout(function(){
        callback(null, timeout);
    }, timeout);
}

var parallel = Parallel([
    [async_function, 100],
    [async_function, 2000],
    [async_function, 500],
    [async_function, 30]
]);

parallel.on('each', function(err) {
});

parallel.on('error', function(err) {
});

parallel.on('success', function(err) {
});

parallel.on('done', function(err) {
});

parallel.start();
```

###Same function - 10 times

```js
function async_function(timeout) {
    setTimeout(function(){
        callback(null, timeout);
    }, timeout);
}

var parallel = Parallel([
    [async_function, 100],
], 10);
```

###More than 1 param

```js
function async_function(timeout, flag) {
    setTimeout(function(){
        if(flag) {
            return callback(flag);
        }
        return callback(null, timeout, flag);
    }, timeout);
}

var parallel = Parallel([
    [async_function, [100, false]],
    [async_function, [200, true]],
    [async_function, [300, true]],
    [async_function, [500, false]],
], 10);
```