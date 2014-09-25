var request = require('request');

var Parallel = require('./');

var tracking = {
    each: 0,
    error: 0,
    success: 0
};

// var parallel = Parallel([
//     [request, 'http://server-time.herokuapp.com']
// ], 100);

var parallel = Parallel([
    [request, 'http://server-time.herokuapp.com'],
    [request, 'http://ipecho.net/plain']
], 10);

parallel.on('each', function(each) {
    tracking.each++;
});

parallel.on('error', function(error) {
    console.log('error');
    console.log(error);
    tracking.error++;
});

parallel.on('success', function(success) {
    tracking.success++;
});

parallel.on('done', function(data) {
    console.log('done');

    for(var i = 0; i < data.length; i++) {
        console.log(data[i][2]);
    }
    
    console.log(tracking);
});

parallel.start();