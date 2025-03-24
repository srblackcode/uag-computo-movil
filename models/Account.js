const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Account = sequelize.define('Account', {
  account_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0.00,
  },
}, {
  tableName: 'accounts',
  timestamps: true,
});

User.hasMany(Account, { foreignKey: 'user_id' });
Account.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Account;
