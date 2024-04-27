const mongoose = require('mongoose');

const plantTypeSchema = new mongoose.Schema({
    oldId: {type: Number, unique: true},
    name: String,
    image: String,
    description: String,
    uri: {type: String, unique: true}
});

const PlantType = mongoose.model('PlantType', plantTypeSchema);

module.exports = PlantType;