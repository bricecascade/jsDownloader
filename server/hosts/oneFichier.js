define([
    "core/router"
], function(CoreRouter){
    
    var OneFichier = CoreRouter.extend({
        
        hostname    : "OneFichier",
        
        state       : "disable",
        
        routes : {
            "GET:onefichier/state"      : "__getState__",
            "GET:onefichier/check/:url"  : "__check__"
        },
        
        
        checkbyhost:function(url) {
            return /^(https?:\/\/)?[0-9a-zA-Z]+\.1fichier\.com$/.test(url);
        }
        
    });
    
    return OneFichier;
    
});