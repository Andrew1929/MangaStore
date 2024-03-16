const { Schema, model } = require('mongoose');

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cart: [{
        manga: { type: Number, ref: 'Manga', required: true, unique: true },
        quantity: { type: Number, required: true }
    }],
    wishlist: [{
        manga: { type: Number, ref: 'Manga', required: true, unique: true },
        quantity: { type: Number, required: true }
    }],
});

module.exports = model('UserShopping', schema)