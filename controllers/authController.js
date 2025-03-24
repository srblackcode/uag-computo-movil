const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordHash');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'El correo ya está registrado' });

    const password_hash = await hashPassword(password);
    const user = await User.create({ full_name, email, password_hash });
    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({ user: { id: user.id, full_name, email }, token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ user: { id: user.id, full_name: user.full_name, email }, token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login', error: err.message });
  }
};

module.exports = { register, login };
