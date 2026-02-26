import { createUser, findUserByEmail } from '../models/userModel.js';
import { comparePassword, hashPassword, signToken } from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;
    if (!name || !phone || !email || !password || !['client', 'driver'].includes(role)) {
      return res.status(400).json({ message: 'Datos de registro inválidos' });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({ name, phone, email, passwordHash, role });
    const token = signToken(user);

    return res.status(201).json({ user, token });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const validPassword = await comparePassword(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = signToken(user);
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        rating: user.rating
      },
      token
    });
  } catch (error) {
    return next(error);
  }
};
