let authVerifer = {};
var config = require('./config'); 
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

getToken = function (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }else if(req.headers['x-access-token']){
    return req.headers['x-access-token'];
  }else if(req.body && req.body.token){
    return req.body.token;
  }
  return null;
}

authVerifer.verifyToken = function (req, res) {
  // check header or url parameters or post parameters for token
  var token = getToken(req);
  console.log(token);
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        res.status(401).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.user = decoded.user;
      }
    });
  } else {
    // if there is no token
    // return an error
    res.status(401).send({
      success: false,
      message: 'No token provided.'
    });    
  }
  if(req.user){
      return true;
  }
  else{
      return false;
  }
}

module.exports = authVerifer;
