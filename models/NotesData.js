const mongoose = require('mongoose');

const savednote = new mongoose.Schema({
    note: {
        type: [String]
    },
    user: {
        type: String
    }
});

module.exports = mongoose.model('savednote', savednote);