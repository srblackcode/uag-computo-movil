const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getMyProfile, updateProfile } = require('../controllers/userController');

router.get('/me', auth, getMyProfile);
router.put('/me', auth, updateProfile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de perfil de usuario
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: Token inválido o expirado
 *   put:
 *     summary: Actualizar perfil del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               pin_code:
 *                 type: string
 *               biometric_enabled:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Perfil actualizado
 */