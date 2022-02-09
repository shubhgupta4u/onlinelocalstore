function mySqlService(host, database, user, password) {
    var connection = connectDb(host, database, user, password);

    console.log("Initializing repositories");
    var users = require('./repositories/users');
    this.usersRepository = new users(connection);

    var home = require('./repositories/home');
    this.homeRepository = new home(connection);

    var product = require('./repositories/product');
    this.productRepository = new product(connection);

    var store = require('./repositories/store');
    this.storeRepository = new store(connection);
    console.log("Initialized repositories");
}

var connectDb = function(host, database, user, password){
    console.log("Connecting to mysql db");
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        debug: false,
        multipleStatements: true
      });
    // var con = this.mysql.createConnection({
    //     host: "sql2.freesqldatabase.com",
    //     user: "sql2233203",
    //     password: "hF3%rY4!",
    //     database: "sql2233203"
    //   });

    // var con = this.mysql.createConnection({
    //     host: "localhost",
    //     user: "shubh",
    //     password: "Jan@1612", //6fab03272fd293fb 
    //     database: "onlinelocalstore"
    //   });
      
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to mysql!");
    });
    
    return con;
}


module.exports = mySqlService;
