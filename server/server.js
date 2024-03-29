var requirejs   = require('requirejs');

requirejs.config({
    //Use node's special variable __dirname to
    //get the directory containing this file.
    //Useful if building a library that will
    //be used in node but does not require the
    //use of node outside
    baseUrl: __dirname,

    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
    
});

requirejs(['app'],function(app) {
    
    // get restify server instance
    var server = app.server;
    
    // start listening
    server.listen(8080, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
  
});