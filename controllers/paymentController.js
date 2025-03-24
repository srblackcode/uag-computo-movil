const PaymentLink = require('../models/PaymentLink');
const QrPayment = require('../models/QrPayment');
const Account = require('../models/Account');
const { Sequelize } = require('sequelize');

// Crear enlace de pago
const createPaymentLink = async (req, res) => {
  const { account_id, amount, description, expires_at } = req.body;

  try {
    const link = await PaymentLink.create({
      account_id,
      amount,
      description,
      expires_at,
    });

    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el enlace', error: err.message });
  }
};

// Obtener enlace por token
const getPaymentLink = async (req, res) => {
  try {
    const link = await PaymentLink.findOne({
      where: { token: req.params.token, is_active: true },
    });

    if (!link) return res.status(404).json({ message: 'Enlace no encontrado o inactivo' });

    res.json(link);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el enlace', error: err.message });
  }
};

// Registrar pago con QR
const payWithQR = async (req, res) => {
  const { payer_account_id, receiver_account_id, amount } = req.body;

  const t = await Account.sequelize.transaction();

  try {
    const payer = await Account.findByPk(payer_account_id, { transaction: t });
    const receiver = await Account.findByPk(receiver_account_id, { transaction: t });

    if (!payer || !receiver) throw new Error('Cuentas inválidas');
    if (parseFloat(payer.balance) < parseFloat(amount)) throw new Error('Saldo insuficiente');

    payer.balance = Sequelize.literal(`balance - ${amount}`);
    receiver.balance = Sequelize.literal(`balance + ${amount}`);

    await payer.save({ transaction: t });
    await receiver.save({ transaction: t });

    const qrPayment = await QrPayment.create({
      payer_account_id,
      receiver_account_id,
      amount
    }, { transaction: t });

    await t.commit();
    res.status(201).json(qrPayment);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: 'Error al pagar con QR', error: err.message });
  }
};

module.exports = { createPaymentLink, getPaymentLink, payWithQR };
