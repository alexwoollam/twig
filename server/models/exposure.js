const mongoose = require('mongoose');

const exposureSchema = new mongoose.Schema({
    oldId: {type: Number, unique: true},
    name: String
});

const Exposure = mongoose.model('Exposure', exposureSchema);

module.exports = Exposure;