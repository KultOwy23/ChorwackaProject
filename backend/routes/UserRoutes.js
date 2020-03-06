const express = require('express');
const app = express.Router();
const repository = require('../repositories/UserRepository');

app.get('/',(_, res) => {
    repository.findAll().then((users) => {
        res.json(users);
    }).catch((error) => console.log(error));
});

app.post('/', (req, res) => {
    const { user } = req.body;
    console.log(user);
    repository.create(user).then((user) => {
        res.json(user);
    }).catch((error) => console.log(error));
});

app.delete('/', (req, res) => {
    const { id } = req.params;
    repository.deleteById(id).then((ok) => {
        console.log(ok);
        console.log(`Deleted record of user with id: ${id}`);
        res.status(200).json([]);
    }).catch((error) => console.log(error));
});

app.put('/:id',(req,res) => {
    const { id } = req.params;
    const {user} = req.body;
    repository.updateById(id, user)
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
})

module.exports = app;