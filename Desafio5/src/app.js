import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import exphbs from 'express-handlebars';
import path from 'path';
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
    await ProductManager.createProduct(product);
    io.emit('updateProducts', await ProductManager.getProductData());
  });

  // Escucha la eliminación de un producto
  socket.on('deleteProduct', async (productId) => {
    await ProductManager.deleteProduct(productId);
    io.emit('updateProducts', await ProductManager.getProductData());
  });
});

// Rutas para productos y envío de formulario
app.get('/', async (req, res) => {
  const products = await ProductManager.getProductData();
  res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
  const products = await ProductManager.getProductData();
  res.render('realTimeProducts', { products });
});

// Manejo de creación de productos a través de HTTP
app.post('/product', async (req, res) => {
  // Aquí se procesa la creación del producto y se guarda en la base de datos
  const newProduct = req.body;
  await ProductManager.createProduct(newProduct);

  // Luego, notifica a todos los clientes conectados a través de sockets
  io.emit('updateProducts', await ProductManager.getProductData());

  res.redirect('/realtimeproducts');
});

// Manejo de eliminación de productos a través de HTTP
app.delete('/product/:id', async (req, res) => {
  // Aquí se elimina el producto de la base de datos
  const productId = req.params.id;
  await ProductManager.deleteProduct(productId);

  // Notifica a todos los clientes conectados a través de sockets
  io.emit('updateProducts', await ProductManager.getProductData());

  res.redirect('/realtimeproducts');
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


