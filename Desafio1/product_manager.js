class ProductManager {
    constructor() {
        this.products = [];
        this.currentId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.log(`Error: El código '${code}' ya existe en la base de datos.`);
            return;
        }

        const product = {
            id: this.currentId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(product);
        this.currentId++;
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        const product = this.products.find(product => product.id === productId);
        if (product) {
            return product;
        } else {
            console.log("Error: Producto no encontrado");
            return null;
        }
    }
}

// Ejemplo de uso:
const productManager = new ProductManager();

// Agregar productos
productManager.addProduct('Barra de chocolate', 'Chocolate con maní', 150, 'imagen.jpg', 'CHOCO123', 50);
productManager.addProduct('Otro producto', 'Descripción', 100, 'imagen2.jpg', 'OTRO456', 30);

// Obtener todos los productos
console.log(productManager.getProducts());

// Obtener producto por ID
console.log(productManager.getProductById(1));  // Producto existente
console.log(productManager.getProductById(3));  // Producto inexistente


