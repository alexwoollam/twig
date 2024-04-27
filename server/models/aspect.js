const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    oldId: {type: Number, unique: true},
    name: String
});

const Aspect = mongoose.model('Aspect', Schema);

module.exports = Aspect;