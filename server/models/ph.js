const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    oldId: {type: Number, unique: true},
    name: String
});

const PH = mongoose.model('PH', Schema);

module.exports = PH;