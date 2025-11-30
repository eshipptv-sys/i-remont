import jwt from 'jsonwebtoken';
import { env } from './config.js';
import { getUserById } from './data.js';

export function createToken(user) {
  return jwt.sign({ sub: user.id }, env.jwtSecret, { expiresIn: '7d' });
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Нет токена' });
  const [, token] = header.split(' ');
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = getUserById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Пользователь не найден' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
}
