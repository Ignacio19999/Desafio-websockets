const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const hbs = require('hbs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'hbs');

app.use(express.static('assets'));

let productos = [
    { nombre: 'PlayStation 5', precio: 1000000 },
    { nombre: 'Xbox Series X', precio: 800000 },
    { nombre: 'Nintendo Switch', precio: 600000},
];

app.get('/', (req, res) => {
    console.log('Productos:', productos); 
    res.render('home', { productos });
});

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts'); // Renderiza la vista "realTimeProducts.hbs"
});


io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('agregarProducto', (producto) => {
        productos.push(producto);
        // Emitir evento a todos los clientes con la lista actualizada de productos
        io.emit('productosActualizados', productos);
    });

    
    socket.on('eliminarProducto', (indice) => {
        productos.splice(indice, 1);
    
        io.emit('productosActualizados', productos);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

app.post('/crearProducto', (req, res) => {
    io.emit('nuevoProducto', 'Nuevo producto creado');
    res.send('Producto creado exitosamente');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = { app, io };
