// mysql Product module
function Product(connectionArg) {
  console.log("Initializing product repository");
  this.connection = connectionArg;
  console.log("Initialized product repository");
}

Product.prototype.getActiveProducts = function getActiveProducts(req, res) {
  var query = "SELECT product._id,product.storeCode,store.name as 'store',  product.categoryId,  category.name as 'category',  product.code,  product.name,  product.title,  product.description, productImage.image as 'imageUrl', product.price,product.sellPrice, product.moreDetail,  product.offer,  product.offerTC,  product.startDate,  product.endDate,  product.createDate,  product.isActive FROM product inner join store on product.storeCode = store.storeCode inner join category on product.categoryId = category._id inner join productImage on productImage.productId = product._id where product.startDate <= curdate() AND (product.endDate >= curdate() Or  product.endDate is null) AND product.isActive AND store.isActive";
  if (req.query != undefined) {
    if (req.query.category != undefined && req.query.category > 0) {
      query = query + " AND product.categoryId = " + req.query.category;
    } 
    if (req.query.store != undefined && req.query.store.length > 0) {
      query = query + " AND product.storeCode = '" + req.query.store + "'";
    } 
    if (req.query.id != undefined && req.query.id > 0) {
      query = query + " AND product._id = " + req.query.id;
    } 
    if (req.query.code != undefined && req.query.code.length > 0) {
      query = query + " AND product.code = '" + req.query.code + "'";
    }
  }
  console.log(query);
  this.connection.query(query, function(err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
};
Product.prototype.getSearchProduct = function getSearchProduct(req, res) {
  var query = "SELECT product._id,product.storeCode,store.name as 'store',  product.categoryId,  category.name as 'category',  product.code,  product.name,  product.title,  product.description, productImage.image as 'imageUrl', product.price,product.sellPrice, product.moreDetail,  product.offer,  product.offerTC,  product.startDate,  product.endDate,  product.createDate,  product.isActive FROM product inner join store on product.storeCode = store.storeCode inner join category on product.categoryId = category._id inner join productImage on productImage.productId = product._id where product.startDate <= curdate() AND (product.endDate >= curdate() Or  product.endDate is null) AND product.isActive AND store.isActive";
  var query2 ="SELECT count(1) as 'totalCount' FROM product inner join store on product.storeCode = store.storeCode inner join category on product.categoryId = category._id inner join productImage on productImage.productId = product._id where product.startDate <= curdate() AND (product.endDate >= curdate() Or  product.endDate is null) AND product.isActive AND store.isActive";
  var additionQueryText ="";
  console.log(req.body);
  if (req.body != undefined) {
    if (req.body.categoryId != undefined && req.body.categoryId > 0) {
      additionQueryText = additionQueryText + " AND product.categoryId = " + req.body.categoryId;
    } 
    if (req.body.sellerId != undefined && req.body.sellerId > 0) {
      additionQueryText = additionQueryText + " AND store.sellerId = " + req.body.sellerId;
    }
    if (req.body.storeId != undefined && req.body.storeId.length > 0) {
      var delimitedStoreId =req.body.storeId[0];
      for(var i =1;i<req.body.storeId.length;i++){
          delimitedStoreId = delimitedStoreId + ", "+req.body.storeId[i];
      }
      additionQueryText = additionQueryText + " AND store._id IN (" + delimitedStoreId + ")";
    }
    if (req.body.searchText != undefined && req.body.searchText.length > 0) {
      var searchText = req.body.searchText.toLowerCase();
      additionQueryText = additionQueryText + " AND (product.name like '%" + searchText + "%'";
      additionQueryText = additionQueryText + " OR product.title like '%" + searchText + "%'";
      additionQueryText = additionQueryText + " OR product.description like '%" + searchText + "%'";
      additionQueryText = additionQueryText + " OR product.moreDetail like '%" + searchText+ "%')";
    } 
    if (req.body.storeName != undefined && req.body.storeName.length > 0) {
      var store = req.body.storeName.toLowerCase();
      additionQueryText = additionQueryText + " AND (product.storeCode like '%" + store + "%'";
      additionQueryText = additionQueryText + " OR store.name like '%" + store + "%')";
    } 
    if (req.body.priceFrom != undefined && req.body.priceFrom > 0) {
      additionQueryText = additionQueryText + " AND product.sellPrice >= " + req.body.priceFrom;
    }
    if (req.body.priceTo != undefined && req.body.priceTo > 0) {
      additionQueryText = additionQueryText + " AND product.sellPrice <= " + req.body.priceTo;
    }

    query = query + additionQueryText;
    query2 = query2 + additionQueryText;    

    if (req.body.sortBy != undefined && req.body.sortBy.length > 0) {
      switch (req.body.sortBy.toLowerCase()) {
        case "popularityFirst":
          query = query + " order by product.searchedCount DESC";
          break;
        case "pricelowfirst":
          query = query + " order by product.price ASC";
          break;
        case "pricehighfirst":
          query = query + " order by product.price DESC";
          break;
        case "newfirst":
          query = query + " order by product.startDate DESC";
          break;
        default:
          query = query + " order by product.searchedCount DESC";
          break;
      }
    }
    else{
      query = query + " order by product.searchedCount DESC";
    }
    var pageNo = 1;
    var pageSize = 20;
    if (req.body.pageNo != undefined && req.body.pageNo > 0) {
      pageNo = req.body.pageNo
    }
    if (req.body.pageSize != undefined && req.body.pageSize > 0) {
      pageSize = req.body.pageSize
    }
    query = query + " LIMIT " + pageSize + " OFFSET " + (pageNo - 1) * pageSize;
  }
  console.log(query + ";" + query2);
  this.connection.query(query + ";" + query2, [2, 1], function(err, results, fields) {
    if (err) throw err;
    res.send(results);
  });
};

Product.prototype.getTopProductsDeals = function getTopProductsDeals(req, res) {
  var query = '';
  var querySelectPart = "(SELECT product._id,product.storeCode,store.name as 'store',  product.categoryId,  category.name as 'category',  product.code,  product.name,  product.title,  product.description, productImage.image as 'imageUrl', product.price,product.sellPrice, product.moreDetail,  product.offer,  product.offerTC,  product.startDate,  product.endDate,  product.createDate,  product.isActive FROM product inner join store on product.storeCode = store.storeCode inner join category on product.categoryId = category._id inner join productImage on productImage.productId = product._id where product.startDate <= curdate() AND (product.endDate >= curdate() Or  product.endDate is null) AND product.isActive AND store.isActive";
  var queryOrderByPart = " order by product.startDate DESC LIMIT 50)"
  console.log(req.body);
  if (req.body != undefined) {
    var categoryId = req.body;
    if(categoryId.length > 0){
      var query = querySelectPart + " AND product.categoryId = " + categoryId[0] + queryOrderByPart;
      for(var i =1;i<categoryId.length;i++){
        var query = query + " UNION " + querySelectPart + " AND product.categoryId = " + categoryId[i] + queryOrderByPart;
      }
    }   
  }
  console.log(query);
  this.connection.query(query, function(err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
};

module.exports = Product;
