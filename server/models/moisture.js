const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    oldId: {type: Number, unique: true},
    name: String
});

const Moisture = mongoose.model('Moisture', Schema);

module.exports = Moisture;