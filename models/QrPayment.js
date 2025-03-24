const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Account = require('./Account');

const QrPayment = sequelize.define('QrPayment', {
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  scanned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'qr_payments',
  timestamps: true,
});

Account.hasMany(QrPayment, { foreignKey: 'payer_account_id', as: 'paymentsMade' });
Account.hasMany(QrPayment, { foreignKey: 'receiver_account_id', as: 'paymentsReceived' });

QrPayment.belongsTo(Account, { foreignKey: 'payer_account_id', as: 'payer' });
QrPayment.belongsTo(Account, { foreignKey: 'receiver_account_id', as: 'receiver' });

module.exports = QrPayment;
