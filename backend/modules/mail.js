const nodemailer = require('nodemailer');
const CONFIG = require('../config/config');

class MyMailer {
    constructor() {
        // this.mailDecorator = new MailDecorator('./templates/mail_body.html');
        this.transporter = nodemailer.createTransport({
            service: CONFIG.EMAIL_SERVICE,
            auth: {
                user: CONFIG.EMAIL_ADDRESS,
                pass: CONFIG.EMAIL_PASSWORD
            }
        });
    };

    sendMail = function(mailTo, mailTitle, mailBody) {
        var mailOptions = {
            from: CONFIG.EMAIL_ADDRESS,
            to: mailTo,
            subject: mailTitle,
            html: mailBody 
        } 
        this.transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                return console.log(error);
            }
            console.log('Message sent: '+info.response);
            return;
        })

    }
}

module.exports = {MyMailer}