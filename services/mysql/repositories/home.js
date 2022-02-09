// mysql Users module
function Home(connectionArg) {    
    console.log("Initializing home repository");
    this.connection = connectionArg;
    console.log("Initialized home repository");
  }
  Home.prototype.getBanners = function getBanners(req, res) {
    this.connection.query("SELECT * FROM banners", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
  }

  Home.prototype.getMainCategories = function getMainCategories(req, res) {
    this.connection.query("SELECT * FROM category where parentId = -1 and IsActive =1", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
  }
  Home.prototype.getAllCategories = function getAllCategories(req, res) {
    this.connection.query("SELECT * FROM category", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
  }
  module.exports = Home;
