const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  sendMessage,
  getMyMessages
} = require('../controllers/supportController');

router.post('/', auth, sendMessage);
router.get('/', auth, getMyMessages);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Support
 *   description: Mensajes al área de soporte
 */

/**
 * @swagger
 * /support:
 *   post:
 *     summary: Enviar mensaje al soporte
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje enviado

 *   get:
 *     summary: Obtener historial de mensajes enviados
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mensajes
 */
