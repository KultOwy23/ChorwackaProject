const mail = require('../modules/mail.js/index.js');
const dbCtrl = require('../modules/database.js');

const myMailer = new mail.MyMailer();

app.get('/sendraport/:monthid', (req,res) =>  {
    myMailer.sendMail('jedrzej.zawojski95@gmail.com');
    res.send('Message send');
})
app.get('/bill/:monthid', (req, res) => res.send());
app.put('/bill/:monthid', (req, res) => res.send());
app.post('/bill', (req,res) => res.send());
app.get('/raport/:monthid', (req, res) => res.send());