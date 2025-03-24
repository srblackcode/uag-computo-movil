const User = require('../models/User');

// Obtener perfil del usuario autenticado
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'full_name', 'email', 'pin_code', 'biometric_enabled', 'createdAt']
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil', error: err.message });
  }
};

// Actualizar datos del usuario
const updateProfile = async (req, res) => {
  try {
    const { full_name, pin_code, biometric_enabled } = req.body;
    const user = await User.findByPk(req.user.id);

    if (full_name) user.full_name = full_name;
    if (pin_code) user.pin_code = pin_code;
    if (typeof biometric_enabled === 'boolean') user.biometric_enabled = biometric_enabled;

    await user.save();
    res.json({ message: 'Perfil actualizado', user });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar perfil', error: err.message });
  }
};

module.exports = { getMyProfile, updateProfile };
