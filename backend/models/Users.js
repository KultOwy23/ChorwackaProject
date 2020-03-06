const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
    },
    rent_share: {
        type: Number,
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;