const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const SavingRule = sequelize.define('SavingRule', {
  round_up: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  percentage: {
    type: DataTypes.DECIMAL(5, 2), // Ejemplo: 10.00 = 10%
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'saving_rules',
  timestamps: true,
});

User.hasMany(SavingRule, { foreignKey: 'user_id' });
SavingRule.belongsTo(User, { foreignKey: 'user_id' });

module.exports = SavingRule;
