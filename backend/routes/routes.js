const express = require('express');
const app = express.Router();

const mail = require('../modules/mail');
// const dbCtrl = require('../modules/database');

const myMailer = new mail.MyMailer();


app.get('/sendraport/:monthid', (req,res) =>  {
    myMailer.sendMail('jedrzej.zawojski95@gmail.com');
    res.send('Message send');
})
app.get('/sendmail', (req, res) => {
    myMailer.sendMail('jedrzej.zawojski95@gmail.com');
    res.send('Message sent');
})
app.get('/bill/:monthid', (req, res) => res.send());
app.put('/bill/:monthid', (req, res) => res.send());
app.post('/bill', (req,res) => res.send());
app.get('/raport/:monthid', (req, res) => res.send());

module.exports = app;