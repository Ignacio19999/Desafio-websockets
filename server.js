require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const productRoutes = require('./routes/products');
const consoleRoutes = require('./routes/consoles');

const app = express();
exports.app = app;

const mongodbURI = process.env.MONGODB_URI;

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

  app.engine('.hbs', expressHandlebars.engine({
    extname: '.hbs',
    handlebars: handlebars
  }));
  
  app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('./views/products', productRoutes);

app.use('./views/consoles', consoleRoutes);

app.get('/', (req, res) => {
  res.render('home'); 
});

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/', (req, res) => {
  res.render('realTimeProducts'); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});