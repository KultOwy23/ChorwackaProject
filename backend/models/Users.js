const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    room: Number,
    rent_share: Number,
    role: {
        type: String,
        default: "roomate",
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;