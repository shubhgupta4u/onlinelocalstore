
let mailService ={};
const nodemailer = require('nodemailer');
const config =require('./config');
const crytojsService =require('./cryptojsservice');

mailService.sendMail = function(to, subject, body){
    var mailTransportOption={
        service: 'gmail', 
        auth: {
            user: config.user, 
            pass: crytojsService.decrypt(config.password)
        }
    };
    let transporter = nodemailer.createTransport(mailTransportOption);
    // setup email data with unicode symbols
    let mailOptions = {
        from: config.user, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: body // html body
    };
    // send mail with defined transport object
    return transporter.sendMail(mailOptions);
}

module.exports = mailService;