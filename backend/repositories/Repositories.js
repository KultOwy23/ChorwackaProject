const Bill = require('../models/Bills');
const Month = require('../models/Months');
const Prices = require('../models/Prices');
const Heating = require('../models/Heatings');

class MonthRepo {
    constructor(model) {
        this.model = model;
    }

    create(newMonth) {
        this.findByMonthCode(newMonth.month_code).then((month) => {
            if(month) {
                return month;
            } else {
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

    findLastMonths() {
        return this.model.find().sort({create_date: -1}).limit(2);
    }

    updateById(id, object) {
        const query = { _id: id};
        return this.model.updateOne(query, {$set: object});
    }

    updateByMonthCode(monthCode, object) {
        if(object.total_rent) {
            object.total_rent = object.total_rent.toFixed(2)*1;
        };
        const query = {month_code: monthCode};
        return this.model.updateOne(query, {$set: object});
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
        const {monthId} = newObject;
        this.findByMonthId(monthId).then((month) => {
            if(month) {
                this.updateByMonthId(monthId,newObject);
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
        return this.model.updateOne(query, { 
            $set: object});
    }
    updateByMonthId(monthId, object) {
        
        const query = {monthId: monthId};
        return this.model.updateOne(query, { 
            $set: object});
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
