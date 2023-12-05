import express from 'express';
import  mongoose from 'mongoose';
import { engine } from 'express-handlebars'
import path from 'path';
import {PORT, MONGODB_CNX_STR} from './config.js';
//import productsRouter from '../routes/products.js';
//import cartsRouter from '../routes/carts.js';
import productsRouter from '../routes/products.api.js';
import cartsRouter from '../routes/carts.api.js';
import viewRoutes from '../routes/viewRoutes.js';
import { Product } from '../models/products.mongoose.js';

await mongoose.connect(MONGODB_CNX_STR)
console.log('base de datos conectada')
///////

// Generar productos
//const productos = [];
//for (let i = 0; i < 200; i++) {
  //productos.push({
  //  _id: i + 1,
  //  title: `Producto ${i + 1}`,
  //  description: `Descripción del Producto ${i + 1}`,
  //  code: `CODE${i + 1}`,
  //  price: Math.random() * 100,
  //  status: 'active',
  //  stock: Math.floor(Math.random() * 100),
  //  category: `Categoria${i % 5 + 1}`,
  //  thumbnail: `url-de-la-imagen-${i + 1}.jpg`,
  //});
//}

// Insertar los productos en la base de datos
//try {
//  await Product.insertMany(productos);
//  console.log('Productos insertados en la base de datos.');
//} catch (error) {
//  console.error('Error al insertar productos:', error);
//} finally {
  // Cerrar la conexión a la base de datos al finalizar
 // await mongoose.connection.close();
//}


/////
const app = express();
app.use(express.json());

// Obtener la ruta del módulo actual
const currentModulePath = new URL(import.meta.url).pathname;
const currentDir = path.dirname(currentModulePath);

// Configurar Handlebars como el motor de plantillas
app.engine(
  'handlebars',
  engine({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(currentDir, 'views/layout'),
  })
);

// Configurar la carpeta de vistas
app.set('view engine', 'handlebars');
app.set('views', path.join(currentDir, 'views'));

// Rutas para productos
app.use('/api/products', productsRouter);

// Rutas para carritos
app.use('/api/carts', cartsRouter);

// Usar las rutas de vistas
app.use('/', viewRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
