define([
   "restify", "backbone", "underscore" 
], function(restify, Backbone, _) {
    
    var CoreRouter = Backbone.Router.extend({
        
        __server__ : null,
        
        constructor: function() {
            
            if(_.isNull(this.__server__)) {
                var app = require("app");
                this.__server__ = app.server;
            }
            
            if(_.size(this.routes) && !_.isNull(this.__server__)) {
                
                _.each (this.routes, function(e, i, l) {
                    
                    if (!_.isUndefined(eval('this.'+e))) {
                        
                        switch(/([A-Z]+):.*/.exec(i)[1]) {
                            
                            case "GET":
                                var path = _.last(/GET:((REGEXP:)?(.*))/.exec(i));
                                path = /^.*REGEXP:.*$/.test(i) ? new RegExp(path) : path;
                                this.__server__.get ( {path: path} , _.bind(eval ('this.'+e),this));
                                break;
                            
                            case "POST":
                                var path = _.last(/POST:((REGEXP:)?(.*))/.exec(i));
                                path = /^.*REGEXP:.*$/.test(i) ? new RegExp(path) : path;
                                this.__server__.post ( {path: path} ,  _.bind(eval ('this.'+e), this));
                                break;
                            
                            case "PUT":
                                var path = _.last(/PUT:((REGEXP:)?(.*))/.exec(i));
                                path = /^.*REGEXP:.*$/.test(i) ? new RegExp(path) : path;
                                this.__server__.put ( {path: path} ,  _.bind(eval ('this.'+e), this));
                                break;
                                
                            case "DELETE":
                                var path = _.last(/DELETE:((REGEXP:)?(.*))/.exec(i));
                                path = /^.*REGEXP:.*$/.test(i) ? new RegExp(path) : path;
                                this.__server__.del ( {path: path} ,  _.bind(eval ('this.'+e), this));
                                break;
                                
                            default : 
                                console.log ("\n[CoreRouter] : Error routes, unknown protocol : "+i);
                        } 
                        
                    }
                    else console.log ("WARNING : Unknown method  : "+e+" for route : "+i);

                }, this);
            }
        },
        
        __getState__:function(req, res, next) {
            
            if(!this.hostname && !this.state)
                return res.send({error:"unknow error"});
            
            var response = {};
            response[this.hostname] = this.state;
            res.send(response);
            return next();
            
        },
        
        __check__:function(req, res, next) {

            var url = req.params ? decodeURIComponent(req.params.url) : 'undefined';
            
            if(url === 'undefined')
                return next(new restify.MissingParameterError({message:"url not found!"}));
            
            var response = {};
            response[this.hostname] = "LINK " + (this.checkbyhost(url) ? "OK" : "ERROR");
            res.send(response);
            return next();            
        },
        
        checkbyhost:function(url){
            return true;
        }
        
    });
    
    return CoreRouter;
   
});