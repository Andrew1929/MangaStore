const {Schema , model} = require ('mongoose')

const schema = new Schema ({
    id :{type: Number, required: true, unique: true },
    title: {type: String,required: true},
    author: {type: String, required: true},
    cover: {type :String, required: true},
    price: {type:Number, required:true},
    genre: {type:String,required:true},
    status: { type: String, enum: ['Available', 'Preorder', 'Out of Stock', 'Discontinued'] },
    ratings: [{
        score: { type: Number }
    }]
})

module.exports = model('Manga', schema) 