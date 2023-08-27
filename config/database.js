// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('database_development', 'postgres', 'postgres', {
//     host: 'localhost',
//     dialect: 'postgres'
//   });
  
//   module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_development', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
  });
  
  module.exports = sequelize;