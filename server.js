require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const consolesRoutes = require('./routes/consoles');

const app = express();

const mongodbURI = process.env.MONGODB_URI;

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.use(express.json());

app.use('/products', productRoutes);
app.use('/consoles', consolesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});