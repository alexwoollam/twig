const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const metaFilePath = './rawData/meta/allmeta.json';
const mongoURI = 'mongodb://mongousradmin:mongopassadmin@localhost:27017';

async function importJSON() {
    try {
        await mongoose.connect(mongoURI);

        const metaJson = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));

        for (const key in metaJson) {
            if (metaJson.hasOwnProperty(key)) {
                const modelName = key.charAt(0).toUpperCase() + key.slice(1);
                const Model = require(`./server/models/${key}`);
                const rows = metaJson[key];

                for (const row of rows) {
                    await new Model(row).save();
                }

                console.log(`Imported ${rows.length} documents into ${modelName} collection.`);
            }
        }

        console.log('All data imported successfully.');
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error during JSON processing:', error);
    }
}

importJSON().catch(error => {
    console.error('Error during import:', error);
});
