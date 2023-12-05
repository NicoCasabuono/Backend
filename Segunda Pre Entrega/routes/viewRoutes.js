import express from 'express';
import axios from 'axios';

const router = express.Router();

// Vista de todos los productos con paginación
router.get('/products', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    const products = response.data.payload;

    // Renderizar la vista de productos con datos paginados
    res.render('product/productView', { products, layout: 'layout/main' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});

// Vista de un carrito específico
router.get('/carts/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    const response = await axios.get(`http://localhost:8080/api/carts/${cartId}`);
    const cart = response.data.payload;

    // Renderizar la vista del carrito con los productos asociados
    res.render('cart/cartView', { cart, layout: 'layout/main' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});

export default router;
