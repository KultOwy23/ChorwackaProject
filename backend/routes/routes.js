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
// app.get('/sendraport/:monthcode/user/:userid', (req, res) => {
//     const { userid } = req.params;
//     const { monthcode } = req.params;
//     userRepository.findById(userid).then((user) => {
//         mailer.sendRaportToUser(monthcode, user);
//         console.log(`Send mail ${monthcode} to ${user.name}`);
//         res.send('Message sent');
//     }).catch((error) => console.log(error));
// })

app.get("/sendraport/:year-:month/user/:usermail", (req, res) => {
    const { year } = req.params;
    const { month } = req.params;
    const { usermail } = req.params;
    const monthQuery = {year: year, month: month};
    console.log(`User mail: ${usermail}`);
    userRepository.findByMail(usermail).then((user) => {
        // console.log(user);
        // res.json(user);
        mailer.sendRaportToUser(monthQuery,user);
        console.log(`Send mail ${year}-${month} to ${user.name}`);
        res.send('Message sent');
    }).catch((error) => console.log(error));
})

module.exports = app;