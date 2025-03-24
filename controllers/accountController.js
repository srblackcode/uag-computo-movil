const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const { v4: uuidv4 } = require('uuid');

const createAccount = async (req, res) => {
  try {
    const account = await Account.create({
      user_id: req.user.id,
      account_number: uuidv4().replace(/-/g, '').slice(0, 20),
    });
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear cuenta', error: err.message });
  }
};

const getUserAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll({ where: { user_id: req.user.id } });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener cuentas', error: err.message });
  }
};

module.exports = { createAccount, getUserAccounts };
