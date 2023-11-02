import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);
const productsFilePath = currentDir + '/../DB/productos.json';

// Ruta raíz GET para listar todos los productos
router.get('/', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
});

// Ruta GET para obtener un producto por ID
router.get('/:pid', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    const productId = req.params.pid;
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Ruta raíz POST para agregar un nuevo producto
router.post('/', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    const newProduct = req.body;

    // Genera el ID automáticamente
    const newProductId = (products.length + 1).toString();
    newProduct.id = newProductId;

    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.json({ message: 'Producto agregado exitosamente', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// Ruta PUT para actualizar un producto por ID
router.put('/:pid', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    const productId = req.params.pid;
    const updatedProduct = req.body;

    // Encuentra el índice del producto en el arreglo
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      // Actualiza el producto
      products[productIndex] = { ...products[productIndex], ...updatedProduct };
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      res.json({ message: 'Producto actualizado exitosamente', product: products[productIndex] });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Ruta DELETE para eliminar un producto por ID
router.delete('/:pid', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    const productId = req.params.pid;

    // Filtra los productos excluyendo el que se va a eliminar
    const updatedProducts = products.filter((p) => p.id !== productId);

    if (products.length !== updatedProducts.length) {
      fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
      res.json({ message: 'Producto eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;