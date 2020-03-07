const mongoose = require('mongoose');
const { Schema } = mongoose;

const billSchema = new Schema({
    monthId: String,
    energy: {
        value: Number,
        usage: Number,
        cost: Number
    },
    hot_water: {
        value: Number,
        usage: Number,
        cost: Number
    },
    cold_water: {
        value: Number,
        usage: Number,
        cost: Number
    },
    gas: {
        value: Number,
        usage: Number,
        cost: Number
    }
});

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;