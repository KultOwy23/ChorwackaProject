const Bill = require('../models/Bills');
const Month = require('../models/Months');
const Prices = require('../models/Prices');
const Heating = require('../models/Heatings');

class ModelRepository{
    constructor(model) {
        this.model = model;
    }
    create(newObject) {
        const object = new this.model(newObject);
        return object.save();
    }
    findAll() {
        return this.model.find();
    }
    findById(id) {
        return this.model.findById(id);
    }
    findByMonthId(monthid) {
        const query = {monthid: monthid};
        return this.model.findOne(query);
    }
    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }
    updateById(id, object) {
        const query = { _id: id};
        return this.model.findOneAndUpdate(query, { 
            $set: object});
    }
    updateByMonthId(monthId, object) {
        const query = {monthId: monthId};
        return this.model.findOneAndUpdate(query, { 
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
    findOne() {
        return this.model.findOne();
    }
    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }
    updateById(id, object) {
        const query = { _id: id};
        return this.model.findOneAndUpdate(query, { 
            $set: object});
    }
};

const MonthRepository = new ModelRepository(Month);
const BillsRepository = new ModelRepository(Bill);
const HeatingRepository = new ModelRepository(Heating);

const PricesRepository = new PriceRepo(Prices);
module.exports = {MonthRepository, PricesRepository, BillsRepository, HeatingRepository};
