const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const UsersSchema = mongoose.Schema({
    title: String,
    userid: {type: ObjectId, ref:'users.model'},
    description: String,
    price: Number,
    increase: Number,
    category: String,
    date: String,
    province: String,
    city: String,
    image:String,
    status:String,
    publish: String,
    deleted: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', UsersSchema);