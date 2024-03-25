const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const hbs = require('hbs');
const path = require('path');
const ProductManager = require('./ProductManager');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
    const productos = ProductManager.getProductos();
    res.render('realTimeProducts', { productos });
});

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    const productos = ProductManager.getProductos();
    socket.emit('productosActualizados', productos);

    socket.on('agregarProducto', (producto) => {
        ProductManager.agregarProducto(producto);
        io.emit('productosActualizados', ProductManager.getProductos());
    });

    socket.on('eliminarProducto', (index) => {
        ProductManager.eliminarProducto(index);
        io.emit('productosActualizados', ProductManager.getProductos());
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});