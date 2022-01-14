const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    nama: String,
    nohp: String,
    email: String,
    password: String,
    foto: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);