function mongoService(host, database, user, password) {
    var result = connectDb(host, database, user, password);

    console.log("Initializing repositories");
    var users = require('./repositories/users');
    this.usersRepository = new users(result.mongo, result.db);

    var home = require('./repositories/home');
    this.homeRepository = new home(result.mongo, result.db);

    console.log("Initialized repositories");
}

var connectDb = function(host, database, user, password){
    console.log("Connecting to mongo db");
    var mongo = require("mongoose");
    //6fab03422ad493ff4a7f
    //const connectionStr = "mongodb://"+shubhg+":"+Jan%401612+"@"+ds012198.mlab.com:12198+"/"+onlinelocalstore;
    const connectionStr = "mongodb://"+user+":"+password+"@"+host+"/"+database;
    var db = mongo.connect(connectionStr, { 
                    uri_decode_auth: true 
                }, function(err, response){  
                        if(err){ console.log( err); }  
                        else{ console.log("Connected to mongo db");//console.log('Connected to ' + db, ' + ', response);
                }  
            });
    
    return {"mongo":mongo , "db":db};
}


module.exports = mongoService;
