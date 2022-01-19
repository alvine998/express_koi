const mongoose = require('mongoose');

const BannerSchema = mongoose.Schema({
    judul: String,
    deskripsi: String,
    gambar: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Banner', BannerSchema);