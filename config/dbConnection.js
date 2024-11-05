const { Sequelize } = require('sequelize');

const dbConnection = new Sequelize('uade_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

module.exports = {dbConnection}
