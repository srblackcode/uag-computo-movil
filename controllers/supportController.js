const SupportMessage = require('../models/SupportMessage');

// Enviar mensaje al soporte
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const supportMsg = await SupportMessage.create({
      user_id: req.user.id,
      message
    });

    res.status(201).json(supportMsg);
  } catch (err) {
    res.status(500).json({ message: 'Error al enviar mensaje', error: err.message });
  }
};

// Obtener mensajes enviados por el usuario
const getMyMessages = async (req, res) => {
  try {
    const messages = await SupportMessage.findAll({
      where: { user_id: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener mensajes', error: err.message });
  }
};

module.exports = { sendMessage, getMyMessages };
