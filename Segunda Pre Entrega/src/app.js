import express from 'express';
import  mongoose from 'mongoose';
import { engine } from 'express-handlebars'
import path from 'path';
import {PORT, MONGODB_CNX_STR} from './config.js';
import productsRouter from '../routes/products.api.js';
import cartsRouter from '../routes/carts.api.js';
import viewRoutes from '../routes/viewRoutes.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


await mongoose.connect(MONGODB_CNX_STR)
console.log('base de datos conectada')

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Configurar Handlebars como el motor de plantillas
app.engine(
  'handlebars',
  engine({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, 'views', 'layout'),
  })
);

// Configurar la carpeta de vistas
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar JSON
app.use(express.json());
// Rutas para productos
app.use('/api/products', productsRouter);
// Rutas para carritos
app.use('/api/carts', cartsRouter);
// Usar las rutas de vistas
app.use('/', viewRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
