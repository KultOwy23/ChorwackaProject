const mongoose = require('mongoose');
const { Schema } = mongoose;

const monthSchema = new Schema({
    create_date: {
        type: Date,
        default: Date.now,
    },
    month_code: String,
    name: {
        type: String,
    },
    year: {
        type: Number,
    },
    total_bill: {
        type: Number,
    },
    total_heat: {
        type: Number,
    },
    total_rent: {
        type: Number,
    },
    comment: {
        type: String,
    }
});

const Month = mongoose.model('Month',monthSchema);
module.exports = Month;