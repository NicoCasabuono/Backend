import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Vista de todos los productos con paginación
router.get('/products', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    const products = response.data.payload;

    // Ruta a las vistas
    const viewsPath = path.join(__dirname, '../views');
    console.log(viewsPath)
    const layoutPath = path.join(viewsPath, 'layout', 'main.handlebars');

    // Renderizar la vista de productos con datos paginados
    res.render(path.join(viewsPath, 'productView'), { products, layout: layoutPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error });
  }
});


// Vista de un carrito específico
router.get('/carts/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    const response = await axios.get(`http://localhost:8080/api/carts/${cartId}`);
    const cart = response.data.payload;

    // Ruta a las vistas
    const viewsPath = path.join(__dirname, '../views');
    const layoutPath = path.join(viewsPath, 'layout', 'main.handlebars');

    // Renderizar la vista del carrito con los productos asociados
    res.render(path.join(viewsPath, 'cartView'), { cart, layout: layoutPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});

export default router;

