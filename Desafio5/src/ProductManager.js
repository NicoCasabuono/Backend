import fs from 'fs/promises';

const ProductManager = {
  getProductData: async () => {
    try {
      const fileExists = await fs.access('products.json').then(() => true).catch(() => false);

      if (fileExists) {
        const data = await fs.readFile('products.json', 'utf-8');
        return JSON.parse(data);
      } else {
        console.error('Error: products.json does not exist');
        return [];
      }
    } catch (error) {
      console.error('Error getting product data:', error);
      return [];
    }
  },

  deleteProduct: async (productId) => {
    try {
      let products = await ProductManager.getProductData();
      products = products.filter((product) => product.id !== productId);
      await fs.writeFile('products.json', JSON.stringify(products, null, 2));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  },

  createProduct: async (newProduct) => {
    try {
      const products = await ProductManager.getProductData();
      products.push(newProduct);
      await fs.writeFile('products.json', JSON.stringify(products, null, 2));
    } catch (error) {
      console.error('Error creating product:', error);
    }
  },
};

export default ProductManager;
