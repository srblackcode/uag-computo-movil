const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Account = require('./Account');

const PaymentLink = sequelize.define('PaymentLink', {
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  token: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  expires_at: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'payment_links',
  timestamps: true,
});

Account.hasMany(PaymentLink, { foreignKey: 'account_id' });
PaymentLink.belongsTo(Account, { foreignKey: 'account_id' });

module.exports = PaymentLink;
