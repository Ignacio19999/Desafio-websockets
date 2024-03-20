const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const hbs = require('hbs');
const path = require('path');
const productManager = require('./productManager');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/realtimeproducts', (req, res) => {
    const productos = productManager.getProductos();
    res.render('realtimeproducts', { productos });
});

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    const productos = productManager.getProductos();
    socket.emit('productosActualizados', productos);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});