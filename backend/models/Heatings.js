const mongoose = require('mongoose');
const { Schema } = mongoose;

const heatingSchema = new Schema({
    monthid: {
        type: String,
    },
    room1: {},
    room2: {},
    room3: {},
    kitchen: {}
});

const Heating = mongoose.model('Heating',heatingSchema);
module.exports = Heating;