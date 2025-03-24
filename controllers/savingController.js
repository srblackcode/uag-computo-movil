const SavingRule = require('../models/SavingRule');
const Alert = require('../models/Alert');

// Crear o actualizar regla de ahorro
const saveSavingRule = async (req, res) => {
  const { round_up, percentage, active } = req.body;

  try {
    const [rule, created] = await SavingRule.upsert({
      user_id: req.user.id,
      round_up,
      percentage,
      active
    }, { returning: true });

    res.status(200).json(rule);
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar regla de ahorro', error: err.message });
  }
};

// Obtener regla de ahorro del usuario
const getSavingRule = async (req, res) => {
  try {
    const rule = await SavingRule.findOne({ where: { user_id: req.user.id } });
    res.json(rule);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener regla de ahorro', error: err.message });
  }
};

// Obtener alertas
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.findAll({ where: { user_id: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener alertas', error: err.message });
  }
};

// Marcar alerta como vista
const markAlertAsSeen = async (req, res) => {
  try {
    const alert = await Alert.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!alert) return res.status(404).json({ message: 'Alerta no encontrada' });

    alert.seen = true;
    await alert.save();
    res.json(alert);
  } catch (err) {
    res.status(500).json({ message: 'Error al marcar alerta', error: err.message });
  }
};

module.exports = { saveSavingRule, getSavingRule, getAlerts, markAlertAsSeen };
