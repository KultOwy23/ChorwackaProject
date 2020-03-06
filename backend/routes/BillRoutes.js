const express = require('express');
const app = express.Router();
const repositories = require('../repositories/Repositories');
const Repositories = require('../repositories/Repositories');
const { MonthRepository } = Repositories;
const { BillsRepository } = Repositories;
const { HeatingRepository } = Repositories;
const { PricesRepository } = Repositories;

app.get('/months', (_,res) => {
    MonthRepository.findAll().then((months) => {
        res.json(months);
    }).catch((error) => console.log(error));
});

app.post('/months', (req, res) => {
    const { month } = req.body;
    MonthRepository.create(month).then((month) => {
        res.json(month);
    }).catch((error) => console.log(error));
});

app.get('/prices', (_,res) => {
    PricesRepository.findAll().then((prices) => {
        res.json(prices);
    }).catch((error) => console.log(error));
});

app.post('/prices', (req, res) => {
    const { prices } = req.body;
    PricesRepository.create(prices).then((prices) => {
        res.json(prices);
    }).catch((error) => console.log(error));
});

app.get('/bills', (req, res) => {
    BillsRepository.findAll().then((bills) => {
        res.json(bills);
    }).catch((error) => console.log(error));
});

app.post('/bills', (req, res) => {
    const { bills } = req.body;
    BillsRepository.create(bills).then((bills) => {
        res.json(bills);
    }).catch((error) => console.log(error));
});

app.get('/heating', (req, res) => {
    HeatingRepository.findAll().then((heating) => {
        res.json(heating);
    }).catch((error) => console.log(error));
});

app.post('/heating', (req, res) => {
    const { heating } = req.body;
    HeatingRepository.create(heating).then((heating) => {
        res.json(heating);
    }).catch((error) => console.log(error));
});

module.exports = app;
