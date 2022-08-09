const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    datOfBirth: {
        type: Date
    },
    moible: {
        type: Number
    },
    status: {
        type: Boolean
    },
    accountType: {
        type: String
    }
})

module.exports = mongoose.model('Users', userSchema)