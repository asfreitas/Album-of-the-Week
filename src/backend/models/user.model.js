const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    albums: [mongoose.Schema.Types.ObjectId]
});

const User = mongoose.model('User', userSchema);

module.exports = User;