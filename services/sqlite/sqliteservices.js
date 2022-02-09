const sqliteService = {}
let intializeAppSetting = async function  (dbArg) {
  let setting ={};
  
  let sql = 'SELECT name, value  FROM appsetting ORDER BY name';
  var rows = await allAsync(dbArg, sql);
  rows.forEach(function(row){
      switch(row.name)
      {
          case "StorageName": setting.storageName = row.value; break;
          case "MySqlHost": setting.mySqlHost = row.value; break;
          case "MySqlDatabase": setting.mySqlDatabase = row.value; break;
          case "MySqlUser": setting.mySqlUser = row.value; break;
          case "MySqlPwd": setting.mySqlPwd = row.value; break;
          case "MongoDbHost": setting.mongoDbHost = row.value; break;
          case "MongoDbName": setting.mongoDbName = row.value; break;
          case "MongoDbUser": setting.mongoDbUser = row.value; break;
          case "MongoDbPwd": setting.mongoDbPwd = row.value; break;
      }
  });

  return setting;
}
sqliteService.intialize = function intialize() {  
  return new Promise(function (resolve, reject) {
    connectAsync().then(function(db){
      console.log(db);
      intializeAppSetting(db).then(function (setting) {
        resolve(setting);
        close(db);
      })      
    });
  });
}
var connectAsync = function (dbArg, sql) {
  return new Promise(function (resolve, reject) {
    var sqlite3 = require('sqlite3');
    let db = new sqlite3.Database('./db/onlinelocalstore.db', (err) => {
      if (err) {
        reject(err);
      }
      else{
        resolve(db);
        console.log('Connected to the SQlite database.');
      }
    });
  });
};
var allAsync = function (dbArg, sql) {
  return new Promise(function (resolve, reject) {
      dbArg.all(sql, function (err, rows) {
          if (err)
              reject(err);
          else
              resolve(rows);
      });
  });
};

var close = function(db){
    console.log("Closing connection to sqlite3 db");
    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Connection closed to sqlite3 db');
    });
}

module.exports = sqliteService;
