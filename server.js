const express = require('express');
const mongoose = require('mongoose');
const consoleRoutes = require('./routes/consoles');
const cartRoutes = require('./routes/carts');

const app = express();

mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.use(express.json());

app.use('/consoles', consoleRoutes);
app.use('/carts', cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});