const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.currentId = 1;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.currentId = Math.max(...this.products.map(product => product.id)) + 1;
            }
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    addProduct(productData) {
        const product = {
            id: this.currentId,
            ...productData,
        };
        this.products.push(product);
        this.currentId++;
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        return this.products.find(product => product.id === productId);
    }

    updateProduct(productId, updatedProductData) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...updatedProductData,
                id: productId, // Garantiza que el ID no cambie
            };
            this.saveProducts();
        }
    }

    deleteProduct(productId) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
        }
    }
}

module.exports = ProductManager;
