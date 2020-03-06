const mongoose = require('mongoose');
const { Schema } = mongoose;

const pricesSchema = new Schema({
    energy: {
        type: Number,
    },
    hot_water: {
        type: Number,
    },
    cold_water: {
        type: Number,
    },
    gas: {
        type: Number,
    },
    rent: {
        type: Number,
    },
    network: {
        type: Number,
    }
});

const Price = mongoose.model('Price',pricesSchema);
module.exports = Price;