const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createTransaction, getTransactions } = require('../controllers/transactionController');

router.post('/', auth, createTransaction);
router.get('/', auth, getTransactions);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Operaciones financieras
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Realizar una transacción entre cuentas
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [from_account_id, to_account_id, amount, type]
 *             properties:
 *               from_account_id:
 *                 type: integer
 *               to_account_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense, transfer]
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transacción registrada
 *
 *   get:
 *     summary: Obtener transacciones del usuario
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transacciones
 */
