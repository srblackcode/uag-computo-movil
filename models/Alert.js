const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Alert = sequelize.define('Alert', {
  alert_type: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'alerts',
  timestamps: true,
});

User.hasMany(Alert, { foreignKey: 'user_id' });
Alert.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Alert;
