let productos = [
    { nombre: 'PlayStation 5', precio: 499 },
    { nombre: 'Xbox Series X', precio: 499 },
    { nombre: 'Nintendo Switch', precio: 299 }
];

function getProductos() {
    return productos;
}

function agregarProducto(producto) {
    productos.push(producto);
}

function eliminarProducto(index) {
    productos.splice(index, 1);
}

module.exports = { getProductos, agregarProducto, eliminarProducto };