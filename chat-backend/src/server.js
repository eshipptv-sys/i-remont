import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from './config.js';
import { authMiddleware, createToken } from './auth.js';
import {
  addMessage,
  createUser,
  ensureDirectChat,
  findUserByPhone,
  getContacts,
  getUserById,
  listChatsForUser,
  listMessages,
  updateUser,
  userInChat
} from './data.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.frontendUrl,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json());

app.post('/auth/request-code', (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Номер обязателен' });
  return res.json({ code: '0000', phone });
});

app.post('/auth/confirm', (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ message: 'Номер и код обязательны' });
  if (code !== '0000') return res.status(400).json({ message: 'Неверный код' });
  let user = findUserByPhone(phone);
  if (!user) {
    user = createUser(phone);
  }
  const token = createToken(user);
  return res.json({ token, user });
});

app.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

app.put('/me', authMiddleware, (req, res) => {
  const { name, status } = req.body;
  const updated = updateUser(req.user.id, {
    ...(name ? { name } : {}),
    ...(status ? { status } : {})
  });
  res.json(updated);
});

app.get('/contacts', authMiddleware, (req, res) => {
  const contacts = getContacts(req.user.id);
  res.json(contacts);
});

app.get('/chats', authMiddleware, (req, res) => {
  const chats = listChatsForUser(req.user.id);
  res.json(chats);
});

app.post('/chats', authMiddleware, (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'userId обязателен' });
  const target = getUserById(userId);
  if (!target) return res.status(404).json({ message: 'Пользователь не найден' });
  const chat = ensureDirectChat(req.user.id, userId);
  res.json(chat);
});

app.get('/chats/:id/messages', authMiddleware, (req, res) => {
  const { id } = req.params;
  if (!userInChat(req.user.id, id)) return res.status(403).json({ message: 'Нет доступа' });
  const limit = Number(req.query.limit ?? 30);
  const offset = Number(req.query.offset ?? 0);
  res.json(listMessages(id, { limit, offset }));
});

app.post('/chats/:id/messages', authMiddleware, (req, res) => {
  const { id } = req.params;
  if (!userInChat(req.user.id, id)) return res.status(403).json({ message: 'Нет доступа' });
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Текст обязателен' });
  const msg = addMessage({ chatId: id, senderId: req.user.id, text });
  io.to(id).emit('message', { message: msg });
  res.status(201).json(msg);
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('no token'));
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = getUserById(payload.sub);
    if (!user) return next(new Error('user missing'));
    socket.data.user = user;
    return next();
  } catch (err) {
    return next(new Error('bad token'));
  }
});

io.on('connection', (socket) => {
  const user = socket.data.user;
  const chats = listChatsForUser(user.id);
  chats.forEach((c) => socket.join(c.id));

  socket.on('join_chat', (chatId) => {
    if (userInChat(user.id, chatId)) {
      socket.join(chatId);
    }
  });

  socket.on('send_message', ({ chatId, text }) => {
    if (!userInChat(user.id, chatId)) return;
    const msg = addMessage({ chatId, senderId: user.id, text });
    io.to(chatId).emit('message', { message: msg });
  });
});

server.listen(env.port, () => {
  console.log(`Chat backend running on ${env.port}`);
});
