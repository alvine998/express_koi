const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    nama: String,
    nohp: String,
    email: String,
    jeniskelamin: String,
    alamat: String,
    fotoktp: String,
    pekerjaan: String,
    password: String,
    foto: String,
    jumlah: Number,
    frekuensi_donasi: Number,
    poin: Number,
    statususer: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);