const mailTemplatePath = './templates/mail_body.html';
const fs = require('fs');
const TokenParser = require('token-parser');
const Repositories = require('../repositories/Repositories');
const { MonthRepository } = Repositories;
const { BillsRepository } = Repositories;
const { HeatingRepository } = Repositories;
const { PricesRepository } = Repositories;

class RaportBuilder {
    constructor() {
        this.parser = new TokenParser();
        this.parser.init();
        this.params = {};
    }

    loadRaportData(monthid) {
        let title = `Rozliczenie za miesiąc ${monthid}`;;
        console.log(`LoadRaportdata ${monthid}`);
        MonthRepository.findByMonthId(monthid).then((months) => {
            console.log(`Month: ${months}`);
            this.params.month = months;
            title = `Rozliczenie za miesiąc ${months.name}`;
        }).catch((err) => console.log(err));
        BillsRepository.findByMonthId(monthid).then((bills) => {
            console.log(`Bills: ${bills}`);
            // this.params.bills = bills;
        }).catch((err) => console.log(err));
        HeatingRepository.findByMonthId(monthid).then((heating) => {
            console.log(`Heating: ${heating}`);
            // this.params.heating = heating;
        }).catch((err) => console.log(err));
        PricesRepository.findAll().then((prices) => {
            console.log(`Prices: ${prices}`);
        }).catch((err) => console.log(err));

        return title;
    }

    createRaport(user) {
        this.params.user = user;
        console.log(this.params);
        this.raportBody = fs.readFileSync(mailTemplatePath, 'utf8', (err, data) => {
            if(err) throw err;
            console.log(typeof data);
        });
        let raport = this.parser.replace(this.raportBody, this.params);
        return raport;
    }
}

module.exports = {RaportBuilder};