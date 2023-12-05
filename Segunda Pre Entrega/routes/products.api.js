import express from 'express';
import { Product } from '../models/products.mongoose.js';

const router = express.Router();

// Ruta: GET /api/products
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filters = {};
    if (query) {
      filters.category = query; // Ejemplo: Filtrar por categoría
    }

    const sortOptions = {};
    if (sort) {
      sortOptions.price = sort === 'asc' ? 1 : -1;
    }

    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limit);
    const startIndex = (page - 1) * limit;

    const products = await Product.find(filters)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(parseInt(limit)).lean();

    const response = {
      status: 'success',
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page: parseInt(page),
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
      nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});



// GET /api/products/category/:category
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });

    res.json({ status: 'success', payload: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});

// GET /api/products/availability/:availability
router.get('/availability/:availability', async (req, res) => {
  try {
    const availability = req.params.availability;
    const products = await Product.find({ availability });

    res.json({ status: 'success', payload: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
});

export default router;