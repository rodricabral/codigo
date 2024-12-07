const Proveedores = require('../models/Proveedores');
const { response } = require("express");

const getProveedores = async (req, res = response) => {
 try {
    const proveedores = await Proveedores.findAll();
    res.json(proveedores)
 } catch (error) {
    console.log(error)
 }
}
const createProveedores = async (req, res = response) => {
    try {
       const proveedores = new Proveedores(req.body);
       await proveedores.save();
       res.json(proveedores)
    } catch (error) {
       console.log(error)
    }
   }

   const updateProveedores = async (req, res = response) => {
    try {
       const { id } = req.params;
       const proveedores = await Proveedores.findByPk(id)
       proveedores.nombreProveedor = req.body.nombreProveedor
       proveedores.cuit = req.body.cuit
       await proveedores.save()
       res.json(proveedores)
    } catch (error) {
       console.log(error)
    }
   }

   const deleteProveedores = async (req, res = response) => {
    try {
       const { id } = req.params
       const proveedores = await Proveedores.findByPk(id)
       await proveedores.destroy()
       res.json({msg: "Proveedor eliminado"})
    } catch (error) {
       console.log(error)
    }
   }

   module.exports = {
    getProveedores,
    createProveedores,
    updateProveedores,
    deleteProveedores
   }