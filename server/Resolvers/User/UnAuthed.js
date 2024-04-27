const UserModel = require("../../models/user");
const bcrypt = require("bcrypt");
const {sign, verify} = require("jsonwebtoken");

const UnAuthed = {
    login: async ({ email, password }) => {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        const token = sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        return {
            userId: user._id,
            token,
            tokenExpiration: 1
        };
    },

    token: async ({ token }) => {
        return {
            "valid": !!verify(token, 'your_secret_key')
        };
    },

    addUser: async ({ firstName, lastName, email, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });

        try {
            return await newUser.save();
        } catch (error) {
            throw new Error('Failed to add user');
        }
    },
}

module.exports = UnAuthed;
