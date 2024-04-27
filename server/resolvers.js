const User = require('./Resolvers/User');
const Plants = require("./Resolvers/Plant/Plants");
const Categories = require("./Resolvers/Plant/Categories");

const resolvers = {
    ...User,
    ...Plants,
    ...Categories
}

module.exports = resolvers;
