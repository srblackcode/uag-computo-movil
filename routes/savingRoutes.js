const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  saveSavingRule,
  getSavingRule,
  getAlerts,
  markAlertAsSeen
} = require('../controllers/savingController');

// Reglas de ahorro
router.post('/rule', auth, saveSavingRule);
router.get('/rule', auth, getSavingRule);

// Alertas de seguridad
router.get('/alerts', auth, getAlerts);
router.patch('/alerts/:id/seen', auth, markAlertAsSeen);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Saving
 *   description: Reglas de ahorro y alertas
 */

/**
 * @swagger
 * /saving/rule:
 *   get:
 *     summary: Obtener regla de ahorro del usuario
 *     tags: [Saving]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Regla de ahorro
 *
 *   post:
 *     summary: Crear o actualizar regla de ahorro
 *     tags: [Saving]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               round_up:
 *                 type: boolean
 *               percentage:
 *                 type: number
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Regla actualizada
 */

/**
 * @swagger
 * /saving/alerts:
 *   get:
 *     summary: Obtener alertas de seguridad
 *     tags: [Saving]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alertas

 * /saving/alerts/{id}/seen:
 *   patch:
 *     summary: Marcar alerta como vista
 *     tags: [Saving]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alerta actualizada
 */
