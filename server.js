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
  app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/products', productRoutes);

app.use('/consoles', consoleRoutes);

app.get('/', (req, res) => {
  res.render('home'); 
});

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/', (req, res) => {
  res.render('realTimeProducts'); 
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = users.find(u => u.email === email && u.password === password);
  if (email === 'usuario@example.com' && password === 'contraseña') {
      req.session.user = { email };
      res.redirect('/products');
  } else {
      res.render('login', { error: 'Credenciales incorrectas. Inténtalo de nuevo.' });
  }
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
          return res.status(400).send('El usuario ya existe.');
      }

      const newUser = new User({ email, password });

      await newUser.save();

      res.redirect('/login');
  } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).send('Error al registrar el usuario.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});