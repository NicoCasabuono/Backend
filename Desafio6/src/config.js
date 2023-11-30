export const PORT = 8080;

import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://Casabuono:Nicolas12345@cluster0.xvvxtjg.mongodb.net/';

mongoose.connect(MONGODB_URI, {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB Atlas');
});

export default mongoose;