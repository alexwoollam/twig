const PlantModel = require("../../models/plant");
const UserModel = require("../../models/user");
const Auth = require('../Auth');

const Plants = {
    plant: async (args, context) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userId = await Auth(context.headers['x-auth']);
                const userFetch = await UserModel.findById(userId);

                let filter = {};

                if(args.name){
                    const name = args.name;
                    filter = {
                        $or: [
                            { commonName: { $regex: new RegExp(name, 'i') } },
                            { commonNames : { $regex: new RegExp(name, 'i') } },
                            { botanicalName: { $regex: new RegExp(name, 'i') } },
                            { family: { $regex: new RegExp(name, 'i') } },
                            { genus: { $regex: new RegExp(name, 'i') } }
                        ]
                    }
                }

                if(args.edible === true) {
                    filter.edible = true;
                }

                const page = args.page ? parseInt(args.page) : 1;
                const limit = args.limit ? parseInt(args.limit) : 10;
                const skip = (page - 1) * limit;

                const plant = await PlantModel
                    .find(filter)
                    .skip(skip)
                    .limit(limit)
                    .populate('plantType')
                    .populate('sunlight');

                if (!plant || plant.length === 0) {
                    throw new Error('Plant not found');
                }

                if (!userFetch) {
                    reject(new Error('User not found'));
                }

                resolve(plant);
            } catch (error) {
                reject(error);
            }
        });
    },
};

module.exports = Plants;
