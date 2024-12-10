const { dbConnection } = require("../config/dbConnection");
const { DataTypes } = require("sequelize");

const Pedido = dbConnection.define('Pedido', {
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreComercial: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seleccion: {
        type: DataTypes.STRING,
        allowNull:false
    },
    precioVenta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    proveedor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precioCompra: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fotoProducto: {
        type: DataTypes.BLOB,
        allowNull: false
    }
})

Pedido.sync({})
  .then(() => {
    console.log("Tabla de Pedido Creada");
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports = Pedido