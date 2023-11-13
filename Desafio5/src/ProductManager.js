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
      
      const { name, price } = newProduct;
      const newId = generateUniqueId(products.map(product => product.id)); // Generar el nuevo ID
      const formattedProduct = {
        id: products.length + 1, // Asignar un ID numérico secuencial
        name,
        price: parseFloat(price) // Convertir el precio a número
      };
  
      products.push(formattedProduct);
      await fs.writeFile('products.json', JSON.stringify(products, null, 2));
    } 
    catch (error) {
      console.error('Error creating product:', error);
    }
  },
};

function generateUniqueId(existingIds) {
  if (Array.isArray(existingIds) && existingIds.length > 0) {
    const lastId = existingIds[existingIds.length - 1];
    if (typeof lastId === 'string' && lastId.startsWith('ID-')) {
      const lastIdNumber = parseInt(lastId.split('-')[1]);
      if (!isNaN(lastIdNumber)) {
        const newId = `ID-${lastIdNumber + 1}`;
        return newId;
      }
    }
  }
  return 'ID-1'; // Si no puede generar un nuevo ID, devuelve 'ID-1' como el primer ID
}

export default ProductManager;