const express = require('express')
const app = express()
const CONFIG = require('./config/config');

const routes = require('./routes/routes');

const host = CONFIG.APP_HOST;
const port = CONFIG.APP_PORT;

app.use('/',routes);
app.listen(port, host, () => {
    // const db = new dbCtrl.DBController();
    console.log(`Example app listening on port ${host}:${port}`)
})