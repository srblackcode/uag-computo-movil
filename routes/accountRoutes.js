const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createAccount, getUserAccounts } = require('../controllers/accountController');

router.post('/', auth, createAccount);
router.get('/', auth, getUserAccounts);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Gestión de cuentas bancarias
 */

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Crear una nueva cuenta
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Cuenta creada
 *       500:
 *         description: Error del servidor
 *
 *   get:
 *     summary: Obtener las cuentas del usuario
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cuentas del usuario
 */
