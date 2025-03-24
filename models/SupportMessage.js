const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const SupportMessage = sequelize.define('SupportMessage', {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  response: {
    type: DataTypes.TEXT,
  }
}, {
  tableName: 'support_messages',
  timestamps: true,
});

User.hasMany(SupportMessage, { foreignKey: 'user_id' });
SupportMessage.belongsTo(User, { foreignKey: 'user_id' });

module.exports = SupportMessage;
