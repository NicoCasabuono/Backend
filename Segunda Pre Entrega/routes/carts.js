import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);
const cartsFilePath = currentDir + '/../DB/carrito.json';

// Ruta raíz POST para crear un nuevo carrito
router.post('/', (req, res) => {
  try {
    const newCart = {
      // Genera el ID automáticamente
      id: (new Date().getTime()).toString(),
      products: [],
    };

    const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf8'));
    carts.push(newCart);
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.json({ message: 'Carrito creado exitosamente', cart: newCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Ruta GET para obtener un carrito por ID
router.get('/:cid', (req, res) => {
  try {
    const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf8'));
    const cartId = req.params.cid;
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Ruta GET para obtener todos los carritos
router.get('/', (req, res) => {
    try {
      const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf8'));
      res.json(carts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de carritos' });
    }
});

// Ruta GET para listar productos en un carrito por ID
router.get('/:cid/products', (req, res) => {
  try {
    const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf8'));
    const cartId = req.params.cid;
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
});

// Ruta POST para agregar un producto a un carrito por ID
router.post('/:cid/products/:pid', (req, res) => {
  try {
    const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf8'));
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    const cart = carts.find((c) => c.id === cartId);
    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
      return;
    }

    // Busca el producto en el carrito
    const productInCart = cart.products.find((p) => p.id === productId);
    if (productInCart) {
      // Si el producto ya existe, incrementa la cantidad
      productInCart.quantity += quantity;
    } else {
      // Si el producto no existe, agrégalo al carrito
      cart.products.push({ id: productId, quantity });
    }

    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.json({ message: 'Producto agregado al carrito exitosamente', cart: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

export default router;
