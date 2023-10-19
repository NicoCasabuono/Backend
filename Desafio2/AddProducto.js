const ProductManager = require('./ProductManager.js');
const productManager = new ProductManager('Lista.json'); 
// Agregar un producto
productManager.addProduct({
    title: 'Producto de prueba',
    description: 'Descripción del producto',
    price: 100,
    thumbnail: 'imagen.jpg',
    code: 'PRUEBA123',
    stock: 10
});

productManager.addProduct({
    title: 'Producto de prueba2',
    description: 'Descripción del producto',
    price: 500,
    thumbnail: 'imagen.jpg',
    code: 'PRUEBA1234',
    stock: 20
});

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtener un producto por ID
const product = productManager.getProductById(2);
console.log(product);

// Actualizar un producto
productManager.updateProduct(2, {
    price: 120
});

// Eliminar un producto
productManager.deleteProduct(1);

