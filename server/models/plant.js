const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    id: Number,
    synonyms: [{
        id: Number,
        name: String
    }],
    isSynonym: Boolean,
    synonymParentPlantId: Number,
    synonymParentPlantName: String,
    autoCompleteField: String,
    autoCompleteFieldList: [String],
    botanicalName: String,
    botanicalNameUnFormatted: String,
    family: String,
    genus: String,
    entityDescription: String,
    genusDescription: String,
    price: [{
        plantId: Number,
        price: String,
        oldPrice: String,
        url: String
    }],
    plantType: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlantType'
    }],
    foliage: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foliage'
    }],
    notedForFragrance: Boolean,
    fragrance: String,
    isNative: Boolean,
    habit: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }],
    images: [{
        image: String,
        copyRight: String
    }],
    imageCopyRight: String,
    commonName: String,
    commonNameSortField: String,
    commonNames: [String],
    nurseriesCount: Number,
    isAgm: Boolean,
    isGenus: Boolean,
    isSpecie: Boolean,
    isPlantsForPollinators: Boolean,
    hardinessLevel: Number,
    sunlight: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sunlight'
    }],
    soilType: [Number],
    spreadType: [Number],
    heightType: [Number],
    spread: String,
    height: String,
    timeToFullHeight: [Number],
    aspect: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aspect'
    }],
    moisture: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Moisture'
    }],
    ph: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PH'
    }],
    suggestedPlantUses: [Number],
    plantingPlaces: [Number],
    exposure: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exposure'
    }],
    cultivation: String,
    pestResistance: String,
    diseaseResistance: String,
    pruning: String,
    propagation: String,
    isLowMaintenance: Boolean,
    isDroughtResistance: Boolean,
    supplierURL: String,
    hortGroupDescription: String,
    range: String,
    toxicity: [String],
    seasonOfInterest: [Number],
    colourWithAttributes: [{
        season: Number,
        colour: Number,
        attributeType: Number
    }],
    nameStatus: String,
    hasFullProfile: Boolean,
    seasonColourAgg: [Number],
    plantEntityId: String
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
