const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const TransaksiSchema = mongoose.Schema({
    iduser:{type: ObjectId, ref:'users.model'},
    iddonasi:{type: ObjectId, ref:'donasi.model'},
    foto: String,
    bank:String,
    nominal: Number,
    poin: Number,
    status_transaksi: String,
    keterangan: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaksi', TransaksiSchema);