import { Schema,model,mongoose } from 'mongoose';


const cartSchema = new mongoose.Schema({
  _id: {type: String, require:true},
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Hace referencia al modelo de Productos
    },
  ],
});


const Cart = mongoose.model('Cart', cartSchema);
export { Cart };