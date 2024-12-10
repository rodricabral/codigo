const Proveedores = require("../models/Proveedores");
const { response } = require("express");

const getProveedores = async (req, res = response) => {
  try {
    const proveedores = await Proveedores.findAll();
    res.json(proveedores);
  } catch (error) {
    console.log(error);
  }
};
const createProveedores = async (req, res = response) => {

  try {
    const proveedores = new Proveedores(req.body);

    console.log(proveedores.nombreProveedor);
   
   if(!proveedores.nombreProveedor){
      return res.status(400).json({ error: 'El nombre del proveedor es obligatorio.' });
   }

    await proveedores.save();
    res.json(proveedores);
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    res.status(500).json({ message: "Error al crear proveedor" });
  }
};

const updateProveedores = async (req, res = response) => {
  try {
    const { id } = req.params;
    const proveedores = await Proveedores.findByPk(id);
    proveedores.nombreProveedor = req.body.nombreProveedor;
    proveedores.cuit = req.body.cuit;
    await proveedores.save();
    res.json(proveedores);
  } catch (error) {
    console.log(error);
  }
};

const deleteProveedores = async (req, res = response) => {
  try {
    const { id } = req.params;
    const proveedores = await Proveedores.findByPk(id);
    await proveedores.destroy();
    res.json({ msg: "Proveedor eliminado" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProveedores,
  createProveedores,
  updateProveedores,
  deleteProveedores,
};
