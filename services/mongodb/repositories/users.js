// MongoDb Users module
function Users(mongoArg, dbArg) {
    console.log("Initializing user repository");
    this.mongo = mongoArg;
    this.db = dbArg;

    var Schema = this.mongo.Schema;  
  
    var UsersSchema = new Schema({      
            name: { type: String   },       
            address: { type: String   },   
        },{ versionKey: false });  
   
  
    this.model = this.mongo.model('users', UsersSchema, 'users');

    console.log("Initialized user repository");
  }

  Users.prototype.get = function get() {
    return "Hello from mongodb";
  }

  Users.prototype.getUsers = function getUsers(req, res) {
    this.model.find({},function(err,data){
        if(err){ 
            res.send(err);  
        }  
        else{                
            res.send(data);  
        } 
    })}

  Users.prototype.saveUser = function saveUser(req, res) {
    var mod = new this.model(req.body);  
    if(req.body.mode =="Save")  
    {  
        mod.save(function(err,data){  
            if(err){  
                res.send(err);                
            }  
            else{        
                res.send({data:"Record has been Inserted..!!"});  
            }  
        });  
    }  
    else   
    {  
        this.model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address},  
        function(err,data) {  
            if (err) {  
            res.send(err);         
            }  
            else{        
                res.send({data:"Record has been Updated..!!"});  
            }  
        });  
    }  
  }
   
  Users.prototype.deleteUser = function deleteUser(req, res) {    
    this.model.remove({ _id: req.body.id }, function(err) {    
        if(err){    
            res.send(err);    
        }    
        else{      
                res.send({data:"Record has been Deleted..!!"});               
            }    
    });    
    }  
  
  module.exports = Users;
