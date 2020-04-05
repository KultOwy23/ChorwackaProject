const nodemailer = require('nodemailer');
const CONFIG = require('../config/config');

const builder = require('./raport_builder');

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

    async sendRaportToUser(monthquery, user) {
        let raportBuilder = new builder.RaportBuilder();
        raportBuilder.loadRaportData(monthquery).then(async () => {
            let raport = raportBuilder.createRaport(user);
            let mailOptions = {
                from: CONFIG.EMAIL_ADDRESS,
                to: user.email,
                subject: raport.subject,
                html: raport.body 
            };
            await this.sendMail(mailOptions);
        }).catch((error) => console.log(error));
    }

    async sendRaport(monthquery, users) {
        let raportBuilder = new builder.RaportBuilder();
        raportBuilder.loadRaportData(monthquery).then( async () => {
            for(let i = 0; i< users.length; i++) {
                let user = users[i];
                console.log(`Send mailto: ${user.email}`);
                let raport = raportBuilder.createRaport(user);
                let mailOptions = {
                    from: CONFIG.EMAIL_ADDRESS,
                    to: user.email,
                    subject: raport.subject,
                    html: raport.body 
                } 
                await this.sendMail(mailOptions);
            }
        }).catch((error) => console.log(error));

    }
    
    async sendMail(mailOptions) {
        return new Promise((resolve, reject ) => {
            this.transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(`Error: ${err}`);
                    reject(err);
                } else {
                    console.log(`Mail sent successfully!`);
                    resolve(info);
                }
            });
        });
    }
}

module.exports = {MyMailer}