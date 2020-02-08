const express = require('express')
const app = express()

const host = process.argv[2]
const port = process.argv[3]

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, host, () => console.log(`Example app listening on port ${host}:${port}`))