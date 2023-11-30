import { mongoDbManager } from '../dao/dao';

async function getAllProducts() {
  try {
    // Utiliza el manager de MongoDB
    const products = await mongoDbManager.getAllProducts();
    return products;
  } catch (error) {
    throw new Error('Error al obtener productos');
  }
}

export { getAllProducts };