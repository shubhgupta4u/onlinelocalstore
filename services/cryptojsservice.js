let cryptojsService={};
let crypto = require("crypto-js");
const config = require("./config");

cryptojsService.encrypt = function(plainText){
    if(!plainText){
        return "";
    }
    let crypted = crypto.AES.encrypt(plainText, config.secret).toString(); 
    return crypted;
}
   
cryptojsService.decrypt =  function(cypherText){
    if(!cypherText){
        return "";
    }
    var bytes  = crypto.AES.decrypt(cypherText, config.secret);
    var plaintext = bytes.toString(crypto.enc.Utf8);
    return plaintext;
}

module.exports = cryptojsService;