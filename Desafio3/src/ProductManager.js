const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = path.join(__dirname, '..', 'DB', filePath);
        this.products = [];
        this.currentId = 1;
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.currentId = Math.max(...this.products.map(product => product.id)) + 1;
            }
        } catch (error) {
            this.products = [];
        }
    }

    async saveProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    async addProduct(productData) {
        const product = {
            id: this.currentId,
            ...productData,
        };
        this.products.push(product);
        this.currentId++;
        await this.saveProducts();
    }

    async getProducts() {
        await this.loadProducts();
        return this.products;
    }

    async getProductById(productId) {
        await this.loadProducts();
        return this.products.find(product => product.id === productId);
    }

    async updateProduct(productId, updatedProductData) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...updatedProductData,
                id: productId,
            };
            await this.saveProducts();
        }
    }

    async deleteProduct(productId) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            await this.saveProducts();
        }
    }
}

module.exports = ProductManager;
