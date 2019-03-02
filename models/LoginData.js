const mongoose = require('mongoose');

const paynotescollection = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
});

module.exports = mongoose.model('paynotescollection', paynotescollection);