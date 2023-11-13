import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import exphbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser'; // Importación de body-parser
import { fileURLToPath } from 'url';
import ProductManager from './ProductManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new IOServer(server);

// Configuración de Handlebars
const hbs = exphbs.create({
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'main',
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Manejo de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas HTTP
app.get('/', async (req, res) => {
  const products = await ProductManager.getProductData();
  res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
  const products = await ProductManager.getProductData();
  res.render('realTimeProducts', { products });
});

// WebSockets
io.on('connection', (socket) => {
  console.log('A user connected');

  // Escucha la creación de un nuevo producto
  socket.on('newProduct', async (product) => {
    product.price = product.price.replace(',', '.');
    await ProductManager.createProduct(product);
    io.emit('updateProducts', await ProductManager.getProductData());
  });

  // Escucha la eliminación de un producto
  socket.on('deleteProduct', async (productId) => {
    await ProductManager.deleteProduct(productId);
    io.emit('updateProducts', await ProductManager.getProductData());
  });
});

// Manejo de creación de productos a través de HTTP
app.post('/product', async (req, res) => {
  const { name, price } = req.body;
  const adjustedPrice = price.replace(',', '.'); // Reemplazar comas por puntos en el precio
  const newProduct = { name, price: adjustedPrice };
  await ProductManager.createProduct(newProduct);
  io.emit('updateProducts', await ProductManager.getProductData());
  res.redirect('/realtimeproducts');
});

// Manejo de eliminación de productos a través de HTTP
app.delete('/product/:id', async (req, res) => {
  const productId = req.params.id;
  await ProductManager.deleteProduct(productId);
  io.emit('updateProducts', await ProductManager.getProductData());
  res.redirect('/realtimeproducts');
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});