const sequelize = require('../config/db');
const User = require('./User');

// Puedes importar más modelos y establecer relaciones aquí

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // o { force: true } si quieres limpiar todo
    console.log('Base de datos sincronizada');
  } catch (err) {
    console.error('Error al sincronizar:', err);
  }
};

module.exports = { sequelize, syncDB, User };
