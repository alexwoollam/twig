const mongoose = require('mongoose');
const PlantType = require('./server/models/plantType');
const fs = require("fs");

const mongoURI = 'mongodb://mongousradmin:mongopassadmin@localhost:27017';
const jsonFilePath = './rawData/meta/plantType.json';

async function importJSON() {
    let totalRows = 0;
    let rowCount = 0;
    let skippedRows = 0;

    try {
        await mongoose.connect(mongoURI);

        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const rows = JSON.parse(jsonData);

        totalRows = rows.length;

        for (let i = 0; i < rows.length; i++) {
            const newPlantType = new PlantType({
                ...rows[i]
            });
            await newPlantType.save();
            rowCount++;
            const progress = Math.round((rowCount / totalRows) * 100);
            console.log(`Progress: ${progress}%`);
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
