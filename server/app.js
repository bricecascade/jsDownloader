define([
    'exports', 'restify', "hosts/OneFichier"
], function (exports, restify, OneFichier) {
    
    // create restify instance and exports it
    exports.server = restify.createServer();
    
    // start all modules hosts
    // without () to call constructor fct
    var oneFichier = new OneFichier;
    
    // return restify instance
    return exports.server;
  
});