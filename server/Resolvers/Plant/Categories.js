const Auth = require('../Auth');
const UserModel = require("../../models/user");
const PlantTypeModel = require("../../models/plantType");

const Categories = {
    categories: async (args, context) => {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const userId = await Auth(context.headers['x-auth']);
                    const userFetch = await UserModel.findById(userId);

                    let filter = {};

                    if(args.search){
                        const name = args.search;
                        filter = {
                            $or: [
                                { name: { $regex: new RegExp(name, 'i') } },
                            ]
                        }
                    }

                    const limit = args.limit ? parseInt(args.limit) + 1 : 11;

                    const categories = await PlantTypeModel
                        .find(filter)
                        .limit(limit)

                    const filteredCategories = categories.filter(category => category.name !== "");

                    if (!filteredCategories || filteredCategories.length === 0) {
                        throw new Error('Category not found');
                    }

                    if (!userFetch) {
                        reject(new Error('User not found'));
                    }

                    resolve(filteredCategories);
                } catch (error) {
                    reject(error);
                }
            }
        );
    }
};

module.exports = Categories;