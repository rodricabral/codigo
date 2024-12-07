const Productos = require('../models/Productos');
const { response } = require('express');

const getProductos = async (req, res = response) => {
    try {
        const productos = await Productos.findAll();
        res.json(productos)
    } catch (error) {
        console.log(error)
    }
}

const createProductos = async (req, res = response) => {
    try {
        const productos = new Productos(req.body)
        await productos.save();
        res.json(productos)
    } catch (error) {
        console.log(error)
    }
}

const updateProductos = async (req, res = response) => {
    try {
        const { id } = req.params;
        const productos = await Productos.findByPk(id);
        productos.nombre = req.body.nombre;
        productos.nombreComercial = req.body.nombreComercial;
        productos.seleccion = req.body.seleccion;
        productos.precioVenta = req.body.precioVenta;
        productos.proveedor = req.body.proveedor;
        productos.precioCompra = req.body.precioCompra;
        productos.fotoProducto = req.body.fotoProducto;
        await productos.save()
        res.json(productos)
    } catch (error) {
        console.log(error)
    }
}

const deleteProductos = async (req, res = response) => {
    try {
        const { id } = req.params;
        const productos = await Productos.findByPk(id);
        await productos.destroy();
        res.json({msg: "Producto eliminado"});
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProductos,
    createProductos,
    updateProductos,
    deleteProductos
}