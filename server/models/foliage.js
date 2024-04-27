const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    oldId: {type: Number, unique: true},
    name: String
});

const Foliage = mongoose.model('Foliage', Schema);

module.exports = Foliage;