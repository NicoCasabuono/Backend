const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

const productManager = new ProductManager('productos.json'); // Reemplaza 'productos.json' con el nombre de tu archivo de datos

app.use(express.json());

// Endpoint para obtener productos con opcional ?limit
app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(products);
    }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Server en el puerto ${port}`);
});
