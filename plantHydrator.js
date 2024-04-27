const fs = require('fs');
const Plant = require('./server/models/plant');
const PlantType = require('./server/models/plantType');
const Sunlight = require('./server/models/sunlight');
const PH = require("./server/models/ph");
const Aspect = require("./server/models/aspect");
const Exposure = require("./server/models/exposure");
const Foliage = require("./server/models/foliage");
const Habit = require("./server/models/habit");
const Moisture = require("./server/models/moisture");

const mongoose = require('mongoose');
const mongoURI = 'mongodb://mongousradmin:mongopassadmin@localhost:27017'; // Combine URI and DB name
const jsonFilePath = './rawData/plants.json';
const jsonFilePathTwo = './rawData/plantsTwo.json';

async function importJSON() {
    let totalRows = 0;
    let rowCount = 0;
    let skippedRows = 0;

    try {
        await mongoose.connect(mongoURI);

        const jsonDataOne = fs.readFileSync(jsonFilePath, 'utf8');
        const jsonDataTwo = fs.readFileSync(jsonFilePathTwo, 'utf8');
        const dataOne = JSON.parse(jsonDataOne);
        const dataTwo = JSON.parse(jsonDataTwo);

        const rows = dataOne.concat(dataTwo);

        totalRows = rows.length;

        for (let i = 0; i < rows.length; i++) {
            try {
                const plantTypeIds = rows[i].plantType || [0];
                const plantTypes = await PlantType.find({ oldId: { $in: plantTypeIds } });
                const plantTypeObjects = plantTypes.map(plantType => plantType._id);

                const sunlightIds = rows[i].sunlight || [0]
                const sunlight = await Sunlight.find({ oldId: { $in: sunlightIds } });
                const sunlightObjects = sunlight.map(thing => thing._id)

                const phId = rows[i].ph || 0;
                const ph = await PH.find({ oldId: phId });
                const phObject = ph ? ph._id : null;

                const aspectIds = rows[i].aspect || [0];
                const aspects = await Aspect.find({ oldId: { $in: aspectIds } });
                const aspectObjects = aspects.map(aspect => aspect._id);

                const exposureIds = rows[i].exposure || [0];
                const exposures = await Exposure.find({ oldId: { $in: exposureIds } });
                const exposureObject = exposures.map(exposure => exposure._id);

                const foliageIds = rows[i].foliage || [0];
                const foliages = await Foliage.find({ oldId: { $in: foliageIds } });
                const foliageObject = foliages.map(foliage => foliage._id);

                const habitIds = rows[i].habit || [0];
                const habits = await Habit.find({ oldId: { $in: habitIds } });
                const habitObject = habits.map(habit => habit._id);

                const moistureIds = rows[i].moisture || [0];
                const moistures = await Moisture.find({ oldId: { $in: moistureIds } });
                const moistureObject = moistures.map(moisture => moisture._id);

                const newPlant = new Plant({
                    ...rows[i],
                    plantType: plantTypeObjects,
                    sunlight: sunlightObjects,
                    ph: phObject,
                    aspect: aspectObjects,
                    exposure: exposureObject,
                    foliage: foliageObject,
                    habit: habitObject,
                    moisture: moistureObject,
                });

                await newPlant.save();
                rowCount++;
                const progress = Math.round((rowCount / totalRows) * 100);
                console.log(`Progress: ${progress}%`);
            } catch (error) {
                console.error('Error saving document:', error);
                skippedRows++;
            }
        }

        console.log('JSON file successfully processed and data imported into MongoDB.');
        console.log(`Total rows processed: ${rowCount}, Skipped rows: ${skippedRows}`);

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error during JSON processing:', error);
    }
}

importJSON().catch(error => {
    console.error('Error during import:', error);
});
