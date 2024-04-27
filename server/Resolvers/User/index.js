const Auth = require("./Auth");
const UnAuthed = require("./UnAuthed");


const User = {
    ...Auth,
    ...UnAuthed
}

module.exports = User;