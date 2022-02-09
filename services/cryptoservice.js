let cryptoService={};
let crypto;
let password = "onlinelocalstore";
let algorithm = 'aes-256-ctr';
const config = require('./config');
try {
  crypto = require('crypto');
  console.log('crypto support is enabled!');
} catch (err) {
  console.log('crypto support is disabled!');
}

cryptoService.hash = function(text){
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', config.secret);
  hmac.update(text);
  return hmac.digest('hex');
}

cryptoService.encrypt = function(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}
   
 cryptoService.decrypt =  function(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

module.exports = cryptoService;