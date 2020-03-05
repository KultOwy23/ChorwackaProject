const express = require('express')
const app = express()

const host = process.argv[2]
const port = process.argv[3]

app.listen(port, host, () => {
    // const db = new dbCtrl.DBController();
    console.log(`Example app listening on port ${host}:${port}`)
})