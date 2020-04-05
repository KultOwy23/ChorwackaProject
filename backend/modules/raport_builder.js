const mailTemplatePath = './templates/mail_body.html';
const sectionTemplatePath = './templates/roomate_section.html';
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

    async loadRaportData(monthquery) {
        console.log(`LoadRaportdata ${monthquery}`);
        await MonthRepository.findMonthByQuery(monthquery).then((month) => {
            this.params.month = month;
            this.month_id = month._id;
        }).catch((err) => console.log(err));
        await PricesRepository.findOne().then((prices) => {
            this.params.prices = prices;
        }).catch((error) => console.log(error));
        await BillsRepository.findByMonthId(this.month_id).then((bill) => {
            this.params.bill = bill;
        }).catch((error) => console.log(error));
        await HeatingRepository.findByMonthId(this.month_id).then((heating) => {
            this.params.heating = heating;
        }).catch((error) => console.log(error));
    }

    buildRoomateSection(user) {
        if(user.role == "roomate") {
            let roomKey = `room${user.room}`;
            let month = this.params.month;
            let prices = this.params.prices;
            let heating = this.params.heating;
            this.params.user_rent = (((month.total_rent - month.total_heat) + prices.network) * user.rent_share).toFixed(2)*1;
            this.params.user_heating = heating[roomKey].cost;
            if(user.room == 2) {
                this.params.user_heating = this.params.user_heating/2;
            }
            this.params.user_bill = (this.params.user_rent + this.params.user_heating).toFixed(2)*1;
            let section = fs.readFileSync(sectionTemplatePath, 'utf8', (err, data) => {
                if(err) throw err;
                console.log(typeof data);
            });

            let userSection = this.parser.replace(section,this.params);
            return userSection;
        } else {
            return "";
        }
    }

    createRaport(user) {
        this.params.user = user;
        this.params.roomatesection = this.buildRoomateSection(user);
        this.raportBody = fs.readFileSync(mailTemplatePath, 'utf8', (err, data) => {
            if(err) throw err;
            console.log(typeof data);
        });
        let raport = this.parser.replace(this.raportBody, this.params);
        let title = `[Chorwacka 6/4] Rozliczenie opłat za miesiąc: ${this.params.month.name}/${this.params.month.year}`;
        return {subject: title, body: raport};
    }
}

module.exports = {RaportBuilder};