const { verify } = require("jsonwebtoken");
const UserModel = require("../../models/user");

const authIt = async (authToken) => {
    return new Promise((resolve, reject) => {
        if (!authToken) {
            reject(new Error('Failed to authenticate'));
        }

        verify(authToken, 'your_secret_key', (err, user) => {
            if (err) {
                reject(new Error('Failed to authenticate'));
            }
            resolve(user.userId);
        });
    });
};

const Auth = {
    user: async (args, context) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userId = await authIt(context.headers['x-auth']);

                const userFetch = await UserModel.findById(userId);

                if (!userFetch) {
                    reject(new Error('User not found'));
                }

                resolve(userFetch);
            } catch (error) {
                reject(error);
            }
        });
    }
};

module.exports = Auth;
