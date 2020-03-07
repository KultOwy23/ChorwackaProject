const mongoose = require('mongoose');
const { Schema } = mongoose;

const heatingSchema = new Schema({
    monthId: String,
    room1: {
        value: Number,
        reset: Number,
        usage: Number,
        cost: Number
    },
    room2: {
        value: Number,
        reset: Number,
        usage: Number,
        cost: Number
    },
    room3: {
        value: Number,
        reset: Number,
        usage: Number,
        cost: Number
    },
    kitchen: {
        value: Number,
        reset: Number,
        usage: Number,
        cost: Number
    }
});

const Heating = mongoose.model('Heating',heatingSchema);
module.exports = Heating;