// MongoDb Home module
function Home(mongoArg, dbArg) {
  console.log("Initializing home repository");
  this.mongo = mongoArg;
  this.db = dbArg;

  var Schema = this.mongo.Schema;

  var BannerSchema = new Schema(
    {
      name: { type: String },
      image: { type: String },
      title: { type: String },
      caption: { type: String },
      isActive: { type: Boolean }
    },
    { versionKey: false }
  );
  this.modelBanner = this.mongo.model("banners", BannerSchema,"banners");

  var CategorySchema = new Schema(
    {
      _id: {type: Number},
      name: { type: String },
      parentId: { type: Number },
      displayOrder: { type: Number },
      isActive: { type: Boolean }
    },
    { versionKey: false }
  );
  this.modelCategory = this.mongo.model("category", CategorySchema,"category");

  console.log("Initialized home repository");
}

Home.prototype.getAllCategories = function getAllCategories(req, res) {
  console.log("Home -> getAllCategories()");
  this.modelCategory.find({}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

Home.prototype.getBanners = function getBanners(req, res) {
  console.log("Home -> getBanners()");
  this.modelBanner.find({}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports = Home;
