// mysql Users module
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../../config');
var cryptoService = require('./../../cryptoservice');
var cryptojsService = require('./../../cryptojsservice');
const uuidv4 = require('uuid/v4');
var mailService = require('./../../mailService');

function Users(connectionArg) {
  console.log("Initializing user repository");
  this.connection = connectionArg;
  console.log("Initialized user repository");
}

Users.prototype.get = function get() {
  return "Hello from mysql";
}

Users.prototype.updateActivationMailId = function updateActivationMailId(req, res) {
  var user = req.body.user;
  var mailMessageid = req.body.mailMessageid;
  if (!user) {
    res.status(500).send({
      success: false,
      message: 'username is missing.'
    });
  }
  var query = "UPDATE users SET mailMessageid = " + mailMessageid + " WHERE username = '" +user +"'";
  this.connection.query(query, function (err, results, fields) {
    if (err) {
      console.log(err.code);
        res.status(500).send({
          success: false,
          message: 'Unkown error occured.'
        });
        return;
    }
    res.send({
      success: true,
      message: 'Mail messsage id updated successfull for the seller account.'
    });
  });
}

Users.prototype.createSellerAccount = function createSellerAccount(req, res) {
  var name = req.body.name;
  var firstname = req.body.firstName;
  var lastname = req.body.lastName;
  var email = req.body.email;
  var phone = req.body.phone;
  var activationCode = uuidv4();
  var password = cryptojsService.decrypt(req.body.password);
  if (!firstname || !lastname || !email || !phone || !password) {
    res.status(500).send({
      success: false,
      message: 'Required seller fields value are missing.'
    });
  }
  if (!name) {
    name = firstname + ' ' + lastname;
  }
  var hashedPwd = cryptoService.hash(password);
  var query2 = "INSERT INTO users (username, password,activationCode,createDate,isActive)  "
  query2 = query2 + " VALUES('" + email + "', '" + hashedPwd + "', '" + activationCode +"', now(), 0)"
  var query3 = "INSERT INTO seller (name, firstname,lastName,phone,isActive,userId,createDate,lastUpdDate) SELECT"
  query3 = query3 + "'" + name + "', " + "'" + firstname + "', " + "'" + lastname + "', " + "'" + phone + "', 0, _id , now(), now()";
  query3 = query3 + " FROM users where username = '" + email + "'";
  console.log(query2);
  this.connection.query(query2 + ";" + query3, [2, 1], function (err, results, fields) {
    if (err) {
      console.log(err.code);
      if (err.code = 'ER_DUP_ENTRY') {
        res.status(500).send({
          success: false,
          message: 'This Email id already exist. kindly use another one and try again.'
        });
        return;
      }
    }
    if (results[0].insertId > 0 && results[1].insertId > 0) {
      console.log('results[0].insertId', results[0].insertId);
      var subject ='OnlineLocalStore - Seller Activation Link';
      var body ='<p>Hi '+ firstname + ' ' + lastname +'</p>';
      body = body + '<br/>';
      body = body + '<p>Welcome to onlinelocalstore. Below is your account details:</p>'
      body = body + '<br/>';
      body = body + '<p>Display Name: '+name+'</p>'
      body = body + '<p>Email Id: '+email+'</p>'
      body = body + '<p>Phone No: '+phone+'</p>'
      body = body + '<br/><br/>';
      body = body +  '<p>Kindly click on the <a href="https://onlinelocalstoreservice.herokuapp.com/activate/"'+ activationCode +'"+ >activate</a> link your account.</p>';
      body = body + '<br/><br/><br/>';
      body = body + '<p>Regards<br/>OnlineLocalStore Team</p>';
      mailService.sendMail(email,subject,body).then(info => {
        console.log('Message sent: %s', info.messageId);
        res.send({
          success: true,
          mailMessageId:info.messageId,
          message: 'Your account has been successfully created. An email has been sent to you with detailed instructions on how to activate it.'
        });
      }).catch(error => {
        res.send({
          success: true,
          mailMessageId:0,
          message: 'Your account has been successfully created. An email has been sent to you with detailed instructions on how to activate it.'
        });
      });
    } else {
      res.status(500).send({
        success: true,
        message: 'Unkown error occured. Please try again!'
      });
    }
  });
}
Users.prototype.authenticate = function authenticate(req, res) {
  var username = cryptojsService.decrypt(req.body.username);
  var password = cryptojsService.decrypt(req.body.password);
  if (!username || !password) {
    res.status(401).send({
      success: false,
      message: 'Authentication failed. username and password are incorrect.'
    });
    return;
  }
  var query = "SELECT s.*, u.password, u.username FROM users u inner join seller s on u._id= s.userId where u.username = '" + username + "'";
  var query2 = "UPDATE users SET lastLoginTime = now() WHERE username = '" + username + "'"
  this.connection.query(query + ";" + query2, [2, 1], function (err, results, fields) {
    if (err) throw err;

    var user = {};
    Object.keys(results[0]).forEach(function (key) {
      var row = results[0][key];
      user.userId = row.userId;
      user.userName = row.username;
      user.name = row.name;
      user.description = row.description;
      user.password = row.password;
      user.isActive = row.isActive;
      user._id = row._id;
    });

    if (!user) {
      res.status(401).send({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {
      var hashedPwd = cryptoService.hash(password);
      if (user.password != hashedPwd) {
        res.status(401).send({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {
        var guid = uuidv4();
        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          user: user.userName
        };
        var token = jwt.sign(payload, config.secret, {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        var data = {
          success: true,
          sellerId: user._id,
          name: user.name,
          description: user.description,
          token: token,
          guid: guid
        };
        res.send(data);
      }
    }
  });
}

module.exports = Users;
