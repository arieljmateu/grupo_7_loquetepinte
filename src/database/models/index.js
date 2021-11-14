'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

// load process variables from .env if not in production
// (in production they should be set as enviroment variables)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


let sequelize = new Sequelize(process.env.DB_DATABASE,
                              process.env.DB_USERNAME,
                              process.env.DB_PASSWORD,
                              {
                                host: process.env.DB_HOST,
                                dialect: process.env.DB_DIALECT
                              });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
