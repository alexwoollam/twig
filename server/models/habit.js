const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    oldId: {type: Number, unique: true},
    name: String
});

const Habit = mongoose.model('Habit', Schema);

module.exports = Habit;