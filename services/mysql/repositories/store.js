// mysql Product module
function Store(connectionArg) {
  console.log("Initializing Store repository");
  this.connection = connectionArg;
  console.log("Initialized Store repository");
}

Store.prototype.getActiveStore = function getActiveStore(req, res) {
  var query = "SELECT store._id, store.storeCode, store.name, store.description, store.sellerId, seller.name as 'sellerName', seller.description as 'sellerDescription',store.categoryId, category.name as 'category', store.startDate, store.endDate, store.createDate, store.lastUpdDate, store.isActive FROM store INNER JOIN seller on store.sellerId = seller._id INNER JOIN category on store.categoryId = category._id where store.startDate <= curdate() AND (store.endDate >= curdate() Or  store.endDate is null) AND seller.isActive AND store.isActive";
  if(req.body != undefined){
    var storesId = req.body;
    console.log(storesId);
    if(storesId.length > 0){
      var delimitedStoreId =storesId[0];
      for(var i =1;i<storesId.length;i++){
          delimitedStoreId = delimitedStoreId + ", "+storesId[i];
      }
      query = query + " AND store._id IN (" + delimitedStoreId + ")";
    }
  }
  else if (req.query != undefined) {
    if (req.query.category != undefined && req.query.category > 0) {
      query = query + " AND store.categoryId = " + req.query.category;
    } 
    if (req.query.code != undefined && req.query.code.length > 0) {
      query = query + " AND store.storeCode = '" + req.query.code + "'";
    } 
    if (req.query.id != undefined && req.query.id > 0) {
      query = query + " AND store._id = " + req.query.id;
    } 
    if (req.query.store != undefined && req.query.store.length > 0) {
      query = query + " AND store.name like '%" + req.query.store + "%'";
    }
    if (req.query.seller != undefined && req.query.seller.length > 0) {
      query = query + " AND seller.name like '%" + req.query.seller + "%'";
    }
  }
  
  console.log(query);
  this.connection.query(query, function(err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
};

module.exports = Store;
