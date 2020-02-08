const express = require('express')
const app = express()

const host = process.argv[2]
const port = process.argv[3]

app.get('/month', (req, res) => res.send('This month: February'))
app.get('/ads', (req, res) => res.send("What`s new"))
app.get('/shopping', (req, res) => res.send('To buy'))
app.get('/cleaning/:id', (req, res) => res.send(`Cleaning schedule ${req.params.id}`))


app.listen(port, host, () => console.log(`Example app listening on port ${host}:${port}`))