const mongoose = require('mongoose');
const { Schema } = mongoose;

const pricesSchema = new Schema({
    energy: Number,
    hot_water: Number,
    cold_water: Number,
    gas: Number,
    heating: Number,
    rent: Number,
    network: Number,
    validFrom: {
        type: Date,
        default: Date.now()
    }
});

const Price = mongoose.model('Price',pricesSchema);
module.exports = Price;