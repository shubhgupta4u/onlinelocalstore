const express = require('express');
// const path = require('path');
const router = express.Router();
var dbService;
var localStorageService = require('./sqlite/sqliteservices');
var cryptoService = require('./cryptoservice');
var authVerifier = require('./authorizationVerifier');
// router.use('/',express.static('src',{redirect:false}));
// router.get('*', function(req,res,next){
//   res.sendFile(path.resolve('src/index.html'));
// });

localStorageService.intialize().then(function(appSetting){ 
  var db = "mongodb";
  var host = "";
  var database = "";
  var user = "";
  var password = "";
  if(appSetting != undefined && appSetting != null){
    db = appSetting.storageName;
  } 
  if(db == "mongodb"){
      dbService = require('./mongodb/mongoservices');
      host = appSetting.mongoDbHost;
      database = appSetting.mongoDbName;
      user = appSetting.mongoDbUser;
      password = appSetting.mongoDbPwd;
  }
  else{   
      dbService = require('./mysql/mysqlservices');
      host = appSetting.mySqlHost;
      database = appSetting.mySqlDatabase;
      user = appSetting.mySqlUser;
      password = appSetting.mySqlPwd;
  }
  password = cryptoService.decrypt(password);  
  dbService = new dbService(host, database, user, password);
});

/* GET api listing. */
router.get('/', (req, res) => {     
  res.send(dbService.usersRepository.get());
});
router.post('/authenticate', function(req, res) {
  dbService.usersRepository.authenticate(req, res);
});
router.get("/protected/seller",function(req,res){ 
  console.log(req.user);
  if(req.user){ 
    res.send({
      success: true,
      message: 'protected seller url.'
    }); 
  }
});
router.post("/createSellerAccount",function(req,res){  
  dbService.usersRepository.createSellerAccount(req, res);  
});
router.post("/updateActivationMailId",function(req,res){  
  dbService.usersRepository.updateActivationMailId(req, res);  
});
router.get("/getBanners",function(req,res){ 
  dbService.homeRepository.getBanners(req, res); 
});
router.get("/getMainCategories",function(req,res){  
  dbService.homeRepository.getMainCategories(req, res);  
});
router.get("/getAllCategories",function(req,res){  
  dbService.homeRepository.getAllCategories(req, res);  
});
router.post("/getSearchProduct",function(req,res){  
  dbService.productRepository.getSearchProduct(req, res);
});
router.get("/getActiveProducts",function(req,res){  
  dbService.productRepository.getActiveProducts(req, res);  
});
router.get("/getActiveStore",function(req,res){  
  dbService.storeRepository.getActiveStore(req, res);  
});
router.post("/getStoresById",function(req,res){  
  dbService.storeRepository.getActiveStore(req, res);  
});
router.post("/getTopProductsDeals",function(req,res){  
  dbService.productRepository.getTopProductsDeals(req, res);  
});
// router.get('/getencryptedMongoPwd', (req, res) => {
//   var encryptedPwd = cryptoService.encrypt("Jan%401612");
//   console.log(encryptedPwd);
//   res.send(encryptedPwd);    
// });
// router.get('/getencryptedMySqlPwd', (req, res) => {
//   var encryptedPwd = cryptoService.encrypt("Jan@1612");
//   console.log(encryptedPwd);
//   res.send(encryptedPwd);   
// });
// router.get('/getencryptedOnlineMySqlPwd', (req, res) => {
//   var encryptedPwd = cryptoService.encrypt("hF3%rY4!");
//   console.log(encryptedPwd);
//   res.send(encryptedPwd);   
// });
// router.get('/getdecryptedOnlineMySqlPwd', (req, res) => {
//   var encryptedPwd = cryptoService.decrypt("4d8c5e426cbd96e8");
//   console.log(encryptedPwd);
//   res.send(encryptedPwd);    
// });
// router.get('/getdecryptedMongoPwd', (req, res) => {
//   var encryptedPwd = cryptoService.decrypt("6fab03422ad493ff4a7f");
//   console.log(encryptedPwd);
//   res.send(encryptedPwd);    
// });
// router.get('/getdecryptedMySqlPwd', (req, res) => {
//   var encryptedPwd = cryptoService.decrypt("6fab03272fd293fb");
//   console.log(encryptedPwd);
//   res.send(encryptedPwd);   
// });
module.exports = router;