const { dbConnection } = require("../config/dbConnection");
const { DataTypes } = require("sequelize");

const Salon = dbConnection.define("Salon", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Salon.sync({})
  .then(() => {
    console.log("tabla creada");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = Salon;
