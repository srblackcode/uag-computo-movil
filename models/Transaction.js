const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Account = require('./Account');

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.ENUM('income', 'expense', 'transfer'),
    allowNull: false,
  },
}, {
  tableName: 'transactions',
  timestamps: true,
});

Account.hasMany(Transaction, { foreignKey: 'from_account_id', as: 'outgoing' });
Account.hasMany(Transaction, { foreignKey: 'to_account_id', as: 'incoming' });

Transaction.belongsTo(Account, { foreignKey: 'from_account_id', as: 'fromAccount' });
Transaction.belongsTo(Account, { foreignKey: 'to_account_id', as: 'toAccount' });

module.exports = Transaction;
