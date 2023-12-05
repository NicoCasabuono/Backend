import { Schema,model,mongoose } from 'mongoose'

const productSchema = new mongoose.Schema({
    _id: {type: String, require:true},
    title: {type: String, require:true},
    description: {type: String, require:true},
    code: {type: String, require:true},
    price: {type: String, require:true},
    status: {type: String, require:true},
    stock: {type: String, require:true},
    category: {type: String, require:true},
    thumbnail: {type: String, require:true}
},{
    strict:'throw',
    versionKey:false,
    statics:{},
    methods:{}
})

const Product = mongoose.model('Product', productSchema);

export { Product };