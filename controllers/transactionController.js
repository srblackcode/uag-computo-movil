const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const { Sequelize } = require('sequelize');

const createTransaction = async (req, res) => {
  const { from_account_id, to_account_id, amount, description, category, type } = req.body;

  const t = await Account.sequelize.transaction();

  try {
    const from = await Account.findByPk(from_account_id, { transaction: t });
    const to = await Account.findByPk(to_account_id, { transaction: t });

    if (!from || !to) throw new Error('Cuentas inválidas');
    if (from.user_id !== req.user.id) throw new Error('No autorizado');

    if (parseFloat(from.balance) < parseFloat(amount)) {
      throw new Error('Saldo insuficiente');
    }

    // Actualizar saldos
    from.balance = Sequelize.literal(`balance - ${amount}`);
    to.balance = Sequelize.literal(`balance + ${amount}`);
    await from.save({ transaction: t });
    await to.save({ transaction: t });

    // Registrar transacción
    const transaction = await Transaction.create({
      from_account_id,
      to_account_id,
      amount,
      description,
      category,
      type
    }, { transaction: t });

    await t.commit();
    res.status(201).json(transaction);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: 'Error en transacción', error: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { association: 'fromAccount', where: { user_id: req.user.id } },
        { association: 'toAccount' }
      ]
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener transacciones', error: err.message });
  }
};

module.exports = { createTransaction, getTransactions };
