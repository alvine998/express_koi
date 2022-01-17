const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    nama: String,
    nohp: String,
    email: String,
    password: String,
    foto: String,
    jumlah: Number,
    frekuensi_donasi: Number,
    poin: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);