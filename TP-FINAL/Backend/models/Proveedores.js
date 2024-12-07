const { dbConnection } = require("../config/dbConnection");
const { DataTypes } = require("sequelize");

const Proveedores = dbConnection.define('Proveedores', {
    nombreProveedor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cuit: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Proveedores.sync({})
.then(() => {
  console.log("Tabla de Proveedores Creada");
})
.catch((error) => {
  console.log(error);
});

module.exports = Proveedores;
