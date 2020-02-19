const nodemailer = require('nodemailer');
const fs = require('fs');
const TokenParser = require('token-parser');

class MailDecorator {
    constructor(filePath) {
        this.parser = new TokenParser();
        this.mailBody = fs.readFileSync(filePath, 'utf8', (err,data) => {
            if (err) throw err;
            console.log(typeof data);
            // this.mailBody = data;
        })
    }

    buildMail = function(params) {
        this.parser.init();
        this.mailBody = this.parser.replace(this.mailBody, params);
        return this.mailBody;
    }
} 

class MyMailer {
    constructor() {
        this.mailDecorator = new MailDecorator('./templates/mail_body.html');
        this.transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: 'rachunki.chorwacka64@hotmail.com',
                pass: 'LgZS8ZVE8pkMwC4LRbss'
            }
        });
    };

    sendMail = function(mailTo) {
        const mailBody = this.mailDecorator.buildMail({name: 'Andrzej', month: 'Marzec'});
        var mailOptions = {
            from: 'rachunki.chorwacka64@hotmail.com',
            to: mailTo,
            subject: `Rozliczenie za Marzec`,
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