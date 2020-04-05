const Bill = require('../models/Bills');
const Month = require('../models/Months');
const Prices = require('../models/Prices');
const Heating = require('../models/Heatings');

const MonthDictionary = {
    1: "Styczeń",
    2: "Luty",
    3: "Marzec",
    4: "Kwiecień",
    5: "Maj",
    6: "Czerwiec",
    7: "Lipiec",
    8: "Sierpień",
    9: "Wrzesień",
    10: "Październik",
    11: "Listopad",
    12: "Grudzień"
};

class MonthRepo {
    constructor(model) {
        this.model = model;
    }
    
    create(newMonth) {
        this.findByYearAndMonth(newMonth.year, newMonth.month).then((month) => {
            if(month) {
                return month;
            } else {
                newMonth.name = MonthDictionary[newMonth.month];
                const month = new this.model(newMonth);
                month.save((err, month) => {
                    if(err) console.log(err);
                    return month; 
                });
            }
        })
    }

    findAll() {
        return this.model.find();
    }

    findById(id) {
        return this.model.findById(id);
    }

    findByMonthCode(monthCode) {
        const query = {month_code: monthCode};
        return this.model.findOne(query);
    }

    findByYearAndMonth(year, month) {
        const query = {year: year, month: month};
        return this.model.findOne(query);
    };

    findMonthByQuery(query) {
        return this.model.findOne(query);
    };

    findLastMonths() {
        return this.model.find().sort({create_date: -1}).limit(2);
    }

    updateById(id, object) {
        const query = { _id: id};
        return this.model.findOneAndUpdate(query, {$set: object});
    }

    updateByMonthQuery(query, object) {
        return this.model.findOneAndUpdate(query,{$set: object});
    }

    updateByMonthCode(monthCode, object) {
        if(object.total_rent) {
            object.total_rent = object.total_rent.toFixed(2)*1;
        };
        const query = {month_code: monthCode};
        return this.model.findOneAndUpdate(query, {$set: object});
    }
    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }
}
class ModelRepository{
    constructor(model) {
        this.model = model;
    }
    create(newObject) {
        const { monthId } = newObject;
        // console.log(`New object: ${monthId}`);
        this.findByMonthId(monthId).then((found) => {
            if(found) {
                return this.updateByMonthId(monthId,newObject);
                // console.log(object);
            } else {
                const object = new this.model(newObject);
                return object.save();
            }
        })
    }
    findAll() {
        return this.model.find();
    }
    findById(id) {
        return this.model.findById(id);
    }
    findByMonthId(monthId) {
        const query = {monthId: monthId};
        return this.model.findOne(query);
    }
    deleteById(id) {
        // console.log(`Delete by id: ${id} Type: ${typeof(id)}`);
        return this.model.findByIdAndDelete(id);
    }
    updateById(id, object) {
        const query = { _id: id};
        // console.log('Update object');
        // console.log(object);
        return this.model.findOneAndUpdate(query, {$set: object});
    }
    updateByMonthId(monthId, object) {
        // console.log(`Update object: ${monthId}`);
        // console.log(object);
        const query = {monthId: monthId};
        return this.model.findOneAndUpdate(query, {$set: object});
    }
};

class PriceRepo{
    constructor(model) {
        this.model = model;
    }
    create(newPrices) {
        const prices = new this.model(newPrices);
        return prices.save();
    }
    findAll() {
        return this.model.find();
    }
    findById(id) {
        return this.model.findById(id);
    }
    findLast() {
        return this.model.find().sort({validFrom: -1}).limit(1);
    }
    findOne() {
        return this.model.findOne();
    }
    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }
    updateById(id, object) {
        const query = { _id: id};
        return this.model.updateOne(query, { 
            $set: object});
    }
};

const MonthRepository = new MonthRepo(Month);
const BillsRepository = new ModelRepository(Bill);
const HeatingRepository = new ModelRepository(Heating);

const PricesRepository = new PriceRepo(Prices);
module.exports = {MonthRepository, PricesRepository, BillsRepository, HeatingRepository};
