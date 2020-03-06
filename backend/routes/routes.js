const express = require('express');
const app = express.Router();

const mail = require('../modules/mail');
const builder = require('../modules/raport_builder');

const mailer = new mail.MyMailer();

const userRepository = require('../repositories/UserRepository');

app.get('/sendraport', (_,res) =>  {
    let mailBody = "";
    const raportBuilder = new builder.RaportBuilder();
    const mailTitle = raportBuilder.loadRaportData("02/2020");
    
    userRepository.findAll().then((users) => {
        users.forEach(user => {
            mailBody = raportBuilder.createRaport(user);
            mailer.sendMail(user.email,mailTitle,mailBody);
        });
        res.send('Mail sent');
    })
})
app.get('/sendmail', (req, res) => {
    // myMailer.sendMail('jedrzej.zawojski95@gmail.com');
    res.send('Message sent');
})
app.get('/bill/:monthid', (req, res) => res.send());
app.put('/bill/:monthid', (req, res) => res.send());
app.post('/bill', (req,res) => res.send());
app.get('/raport/:monthid', (req, res) => res.send());

module.exports = app;