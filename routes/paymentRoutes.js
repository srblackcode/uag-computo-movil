const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createPaymentLink,
  getPaymentLink,
  payWithQR
} = require('../controllers/paymentController');

router.post('/link', auth, createPaymentLink);
router.get('/link/:token', getPaymentLink); // público para pagar desde frontend
router.post('/qr', auth, payWithQR);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Pagos digitales con enlaces y QR
 */

/**
 * @swagger
 * /payments/link:
 *   post:
 *     summary: Crear enlace de pago
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [account_id, amount]
 *             properties:
 *               account_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               expires_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Enlace creado

 *
 * /payments/link/{token}:
 *   get:
 *     summary: Obtener enlace de pago por token
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enlace válido
 *       404:
 *         description: Enlace no encontrado

 *
 * /payments/qr:
 *   post:
 *     summary: Pagar mediante código QR
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [payer_account_id, receiver_account_id, amount]
 *             properties:
 *               payer_account_id:
 *                 type: integer
 *               receiver_account_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pago realizado
 */
