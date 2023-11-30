import mongoose from '../config';
import fileSystemManager from './fileSystemManager';
import cartsModel from './models/carts';
import messagesModel from './models/messages';
import productsModel from './models/products';

const Cart = mongoose.model('Cart', cartsModel);
const Message = mongoose.model('Message', messagesModel);
const Product = mongoose.model('Product', productsModel);

const dao = {
  mongoDbManager: {
    // Utiliza mongoose para operaciones CRUD en MongoDB
    async getAllProducts() {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        throw new Error('Error al obtener productos desde MongoDB');
      }
    },

    async addProduct(newProduct) {
      try {
        const product = new Product(newProduct);
        const savedProduct = await product.save();
        return savedProduct;
      } catch (error) {
        throw new Error('Error al agregar un nuevo producto en MongoDB');
      }
    },

    async updateProduct(productId, updatedProduct) {
      try {
        const product = await Product.findByIdAndUpdate(
          productId,
          { $set: updatedProduct },
          { new: true }
        );
        if (!product) {
          throw new Error('Producto no encontrado en MongoDB');
        }
        return product;
      } catch (error) {
        throw new Error('Error al actualizar el producto en MongoDB');
      }
    },

    async deleteProduct(productId) {
      try {
        const deletedProduct = await Product.findByIdAndRemove(productId);
        if (!deletedProduct) {
          throw new Error('Producto no encontrado en MongoDB');
        }
        return deletedProduct;
      } catch (error) {
        throw new Error('Error al eliminar el producto en MongoDB');
      }
    },
  },

  fileSystemManager: {
    // Utiliza FileSystem para operaciones CRUD adicionales
    // Implementa las operaciones CRUD con FileSystem
    // Agrega las operaciones según sea necesario
  },
};

export default dao;
