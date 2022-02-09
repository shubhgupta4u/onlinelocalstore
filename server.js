var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser'); 
var cors = require('cors');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var jwtMiddleware = require('express-jwt');
var compression = require('compression');

// Get our API routes
const api = require('./services/api');
var config = require('./services/config');

var app = express();

if(compression){
  console.log('compression available');
  app.use(compression());
}

app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
app.use(cors());
 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.setHeader('Access-Control-Allow-Credentials', true); 
  next();
});

 // Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/protected', jwtMiddleware({
  secret: config.secret, // Use the same token that we used to sign the JWT above
  // Let's allow our clients to provide the token in a variety of ways
  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if (req.headers['x-access-token']) {
      return req.headers['x-access-token'];
    } else if (req.body && req.body.token) {
      return req.body.token;
    }
    return null;
  }
}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Failed to authenticate token.');
  }
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.use(express.static('src'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});
 
  /**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, function () {  
    
 console.log('Example app listening on port !' + port); 
})  