const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const hbs = require('hbs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar hbs como el motor de plantillas
app.set('view engine', 'hbs');

// Ruta estática para los archivos públicos
app.use(express.static('assets'));

// Array para almacenar los productos (ejemplo de productos)
let productos = [
    { nombre: 'PlayStation 5', precio: 1000000 },
    { nombre: 'Xbox Series X', precio: 800000 },
    { nombre: 'Nintendo Switch', precio: 600000},
];

// Endpoint para enviar la vista home con la lista de productos
app.get('/', (req, res) => {
    console.log('Productos:', productos); 
    res.render('home', { productos });
});

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts'); // Renderiza la vista "realTimeProducts.hbs"
});

// Configurar Socket.io
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Evento para agregar un producto
    socket.on('agregarProducto', (producto) => {
        productos.push(producto);
        // Emitir evento a todos los clientes con la lista actualizada de productos
        io.emit('productosActualizados', productos);
    });

    // Evento para eliminar un producto
    socket.on('eliminarProducto', (indice) => {
        productos.splice(indice, 1);
        // Emitir evento a todos los clientes con la lista actualizada de productos
        io.emit('productosActualizados', productos);
    });

    // Evento para desconexión de cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Ruta para manejar la creación de un nuevo producto vía HTTP
app.post('/crearProducto', (req, res) => {
    // Simplemente emitimos un evento al socket para notificar la creación del producto
    io.emit('nuevoProducto', 'Nuevo producto creado');
    res.send('Producto creado exitosamente');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = { app, io };