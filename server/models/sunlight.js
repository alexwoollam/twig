const mongoose = require('mongoose');

const sunlightSchema = new mongoose.Schema({
    oldId: {type: Number, unique: true},
    name: String
});

const Sunlight = mongoose.model('Sunlight', sunlightSchema);

module.exports = Sunlight;