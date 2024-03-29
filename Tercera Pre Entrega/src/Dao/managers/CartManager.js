import { cartModel } from '../models/carts.model.js';
import { productModel } from '../models/products.model.js';
import ManagerAccess from '../managers/ManagerAccess.js';

const managerAccess = new ManagerAccess();

export default class ProductManager {

    constructor() {
        this.model = cartModel;
        this.productModel = productModel;
    }

    post = async () => {
        try {
            await managerAccess.saveLog('POST a cart');
            let result = await this.model.create({});
            return result;
        } catch (error) {
            console.log('Cannot post the cart in manager with mongoose: ' + error)
        }
    }

    addProduct = async (idCart, idProduct, quantityBody) => {
        try {
            console.log("cart " + idCart);
            console.log("product " + idProduct);
            await managerAccess.saveLog('POST product in a cart');
            let result;
            const cart = await this.model.find({ _id: idCart });
            const product = await this.productModel.find({ _id: idProduct });
            if (cart.length === 0 || product.length === 0) {
                result = 0;
            } else {
                if(product[0].stock < 1){
                    result = 1; 
                }else{
                    cart[0].products.push({ product: idProduct, quantity: quantityBody });
                    result = await this.model.updateOne({ _id: idCart }, { $set: cart[0] });
                }
            }
            return result;
        } catch (error) {
            console.log('Cannot add the product in cart in manager with mongoose: ' + error)
        }
    }

    get = async () => {
        try {
            await managerAccess.saveLog('GET all carts');
            let carts = await this.model.find();
            return carts;
        } catch (error) {
            console.log('Cannot get carts with mongoose in manager: ' + error)
        }
    }

    getCart = async (cid) => {
        try {
            await managerAccess.saveLog('GET a cart');
            const result = await this.model.find({ _id: cid });
            return result;
        } catch (error) {
            console.log('Cannot get the cart in manager with mongoose: ' + error);
        }
    }

    getCartPopulate = async (cid) => {
        try {
            await managerAccess.saveLog('GET a cart');
            const result = await this.model.findById(cid).populate("products.product").lean();
            return result;
        } catch (error) {
            console.log('Cannot get the cart in manager with mongoose: ' + error);
        }
    }

    delete = async (cid) => {
        try {
            await managerAccess.saveLog('DELETE all products in a cart');
            const cart = await this.model.find({ _id: cid });
            let result;
            if (cart.length === 0) {
                result = 0;
            }else{
                cart[0].products = [];
                result = await this.model.updateOne({ _id: cid }, { $set: cart[0] });
            }
            return result;
        } catch (error) {
            console.log('Cannot delete all products in the cart in manager with mongoose: ' + error);
        }
    }

    deleteProduct = async (cid, pid) => {
        try {
            await managerAccess.saveLog('DELETE a product in a cart');

            const cart = await this.model.find({ _id: cid });
            const product = await this.productModel.find({ _id: pid });
            let result;

            if (cart.length === 0 || product.length === 0) {
                result = 0;
            } else {
                const products = cart[0].products.filter(element => element.product._id != pid);
                cart[0].products = products;
                result = await this.model.updateOne({ _id: cid }, { $set: cart[0] });
            }
            return result;
        } catch (error) {
            console.log('Cannot delete the product in a cart in manager with mongoose: ' + error);
        }
    }

    put = async (cid, products) => {
        try {
            await managerAccess.saveLog('UPDATE all products in a cart');
            const cart = await this.model.findById(cid);
            console.log(cart)
            let result;
            if (!cart) {
                result = 0;
            }else{
                cart.products = products;
                result = await this.model.updateOne({ _id: cid }, { $set: cart });
            }
            return result;
        } catch (error) {
            console.log('Cannot update the cart in manager with mongoose: ' + error);
        }
    }

    putProduct = async (cid, pid, quantity) => {
        try {
            await managerAccess.saveLog('UPDATE product s quantity in a cart');
            const cart = await this.model.find({ _id: cid });
            const product = await this.productModel.find({ _id: pid });
            let result;
            if (cart.length === 0 || product.length === 0) {
                result = 0;
            } else {
                cart[0].products.forEach(function (element) {
                    if (element.product._id == pid) {
                        element.quantity = quantity;
                    }
                });
                result = await this.model.updateOne({ _id: cid }, { $set: cart[0] });
            }
            return result;
        } catch (error) {
            console.log('Cannot update the product s quantity in manager with mongoose: ' + error);
        }
    }

}