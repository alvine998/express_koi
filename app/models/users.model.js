const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: String,
    phone: String,
    username: String,
    password: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);