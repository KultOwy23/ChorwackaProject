const express = require('express');
const app = express.Router();

const mail = require('../modules/mail');
const builder = require('../modules/raport_builder');

const mailer = new mail.MyMailer();

const userRepository = require('../repositories/UserRepository');

app.get('/sendraport/:monthcode', (req,res) =>  {
    const { monthcode } = req.params
    userRepository.findAll().then((users) => {
        console.log(`Sending to users: ${users}`);
        mailer.sendRaport(monthcode, users);      
        res.status(200).json('Messages sent');
    }).catch((error) => console.log(error));
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