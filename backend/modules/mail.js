const nodemailer = require('nodemailer');
const fs = require('fs');
const TokenParser = require('token-parser');
const CONFIG = require('../config/config');

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
            service: CONFIG.EMAIL_SERVICE,
            auth: {
                user: CONFIG.EMAIL_ADDRESS,
                pass: CONFIG.EMAIL_PASSWORD
            }
        });
    };

    sendMail = function(mailTo) {
        var params = {
            name: 'Andrzej',
            month: 'Marzec',
            comment: 'Ogólnie to jest w porządku',
            totalCost: 2003.12,
            rent: 1800,
            prices: {
                energy: 1.22,
                hotwater: 1.11,
                coldwater: 1.12,
                gas: 1.00,
                heat: 10.21,
            },
            bill: {
                energy: {
                    prev: 1123,
                    curr: 1223,
                    diff: 100,
                    cost: 123
                },
                hotwater: {
                    prev: 1123,
                    curr: 1223,
                    diff: 100,
                    cost: 123
                },
                coldwater: {
                    prev: 1123,
                    curr: 1223,
                    diff: 100,
                    cost: 123
                },
                gas: {
                    prev: 1123,
                    curr: 1223,
                    diff: 100,
                    cost: 123
                },
                totalCost: 1000
            },
            heat: {
                room1: {curr: 10, prev: 0, diff:10, cost: 10},
                room2: {curr: 11, prev: 1, diff:10, cost: 10},
                room3: {curr: 12, prev: 2, diff:12, cost: 12},
                kitchen: {curr: 13, prev:3, diff:14, cost: 12},
                totalCost: 121
            }
        }
        const mailBody = this.mailDecorator.buildMail(params);
        const mailTitle = `Rozliczenie za ${params.month}`;
        var mailOptions = {
            from: CONFIG.EMAIL_ADDRESS,
            to: mailTo,
            subject: mailTitle,
            html: mailBody 
        } 
        console.log(mailOptions.from);
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