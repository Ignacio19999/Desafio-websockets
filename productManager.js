const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'products.json');

function getProductos() {
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
}

function guardarProductos(productos) {
    fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, 2), 'utf8');
}

function agregarProducto(producto) {
    const productos = getProductos();
    productos.push(producto);
    guardarProductos(productos);
}

function eliminarProducto(index) {
    const productos = getProductos();
    productos.splice(index, 1);
    guardarProductos(productos);
}

module.exports = { getProductos, agregarProducto, eliminarProducto };