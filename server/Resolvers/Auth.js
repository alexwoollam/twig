const {verify} = require("jsonwebtoken");
 const Auth = async (authToken) => {
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

module.exports = Auth;