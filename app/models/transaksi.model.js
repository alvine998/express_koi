const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const TransaksiSchema = mongoose.Schema({
    iduser:String,
    iddonasi:{type: ObjectId, ref:'donasi.model'},
    foto: String,
    bank:String,
    nominal: Number,
    poin: Number,
    status_transaksi: String,
    nama: String,
    norek: String,
    keterangan: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaksi', TransaksiSchema);