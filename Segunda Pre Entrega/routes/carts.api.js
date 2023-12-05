
import express from 'express';
import { Cart } from '../models/carts.mongoose.js';

const router = express.Router();

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Buscar el carrito por ID y "popule" la propiedad products con los detalles completos de los productos
    const cart = await Cart.findById(cartId).populate('products.productId');

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    // Buscar el carrito por ID
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    // Filtrar productos para mantener solo los que no coincidan con productId
    cart.products = cart.products.filter(product => product.productId.toString() !== productId);

    // Guardar el carrito actualizado
    await cart.save();

    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});

// PUT /api/carts/:cid
router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productsArray = req.body.products; // Espera un arreglo de productos en el cuerpo de la solicitud

    // Buscar el carrito por ID
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    // Reemplazar los productos del carrito con los nuevos proporcionados
    cart.products = productsArray;

    // Guardar el carrito actualizado
    await cart.save();

    res.json({ status: 'success', message: 'Carrito actualizado con productos' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});

// PUT /api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity; // Espera la nueva cantidad de ejemplares

    // Buscar el carrito por ID
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    // Buscar el producto en el carrito por productId
    const productInCart = cart.products.find(product => product.productId.toString() === productId);

    if (!productInCart) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    }

    // Actualizar la cantidad del producto
    productInCart.quantity = newQuantity;

    // Guardar el carrito actualizado
    await cart.save();

    res.json({ status: 'success', message: 'Cantidad de producto actualizada en el carrito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});

// DELETE /api/carts/:cid
router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Buscar y eliminar el carrito por ID
    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', message: 'Productos eliminados del carrito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});

export default router;
