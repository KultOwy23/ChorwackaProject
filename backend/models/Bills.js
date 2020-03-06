const mongoose = require('mongoose');
const { Schema } = mongoose;

const billSchema = new Schema({
    monthid: {
        type: String,
    },
    energy: {},
    hot_water: {},
    cold_water: {},
    gas: {}
});

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;