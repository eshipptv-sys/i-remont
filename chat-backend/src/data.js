import { randomUUID } from 'node:crypto';

const users = [];
const chats = [];
const chatUsers = [];
const messages = [];

function seedUsers() {
  if (users.length) return;
  const seed = [
    { phone: '+10000000001', name: 'Alice', status: 'Online', avatarUrl: null },
    { phone: '+10000000002', name: 'Bob', status: 'Available', avatarUrl: null },
    { phone: '+10000000003', name: 'Carlos', status: 'Busy', avatarUrl: null }
  ];
  seed.forEach((item) => {
    const id = randomUUID();
    users.push({ id, createdAt: new Date(), ...item });
  });
}

seedUsers();

export function findUserByPhone(phone) {
  return users.find((u) => u.phone === phone);
}

export function createUser(phone) {
  const id = randomUUID();
  const newUser = {
    id,
    phone,
    name: `User ${phone.slice(-4)}`,
    avatarUrl: null,
    status: 'На связи',
    createdAt: new Date()
  };
  users.push(newUser);
  return newUser;
}

export function getUserById(id) {
  return users.find((u) => u.id === id);
}

export function updateUser(id, payload) {
  const user = getUserById(id);
  if (!user) return null;
  Object.assign(user, payload);
  return user;
}

export function getContacts(excludeUserId) {
  return users.filter((u) => u.id !== excludeUserId);
}

export function findDirectChat(userA, userB) {
  const chatId = chatUsers
    .filter((cu) => cu.userId === userA)
    .map((cu) => cu.chatId)
    .find((candidate) =>
      chatUsers.some((other) => other.chatId === candidate && other.userId === userB)
    );
  return chats.find((c) => c.id === chatId);
}

export function createChat({ isGroup = false, title = null, participants = [] }) {
  const id = randomUUID();
  const chat = { id, isGroup, title, createdAt: new Date() };
  chats.push(chat);
  participants.forEach((userId) => chatUsers.push({ chatId: id, userId }));
  return chat;
}

export function ensureDirectChat(userA, userB) {
  let chat = findDirectChat(userA, userB);
  if (!chat) {
    chat = createChat({ participants: [userA, userB], isGroup: false });
  }
  return chat;
}

export function listChatsForUser(userId) {
  const userChatIds = chatUsers.filter((cu) => cu.userId === userId).map((cu) => cu.chatId);
  return chats
    .filter((c) => userChatIds.includes(c.id))
    .map((chat) => {
      const chatMessages = messages.filter((m) => m.chatId === chat.id);
      const lastMessage = chatMessages.at(-1) ?? null;
      const participants = chatUsers
        .filter((cu) => cu.chatId === chat.id)
        .map((cu) => getUserById(cu.userId))
        .filter(Boolean);
      const other = participants.find((p) => p.id !== userId) ?? participants[0];
      return {
        ...chat,
        participants,
        unreadCount: 0,
        lastMessage,
        title: chat.isGroup ? chat.title ?? 'Группа' : other?.name ?? 'Чат'
      };
    });
}

export function listMessages(chatId, { offset = 0, limit = 30 } = {}) {
  const chatMessages = messages
    .filter((m) => m.chatId === chatId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  return chatMessages.slice(offset, offset + limit);
}

export function addMessage({ chatId, senderId, text }) {
  const id = randomUUID();
  const msg = {
    id,
    chatId,
    senderId,
    text,
    status: 'sent',
    createdAt: new Date()
  };
  messages.push(msg);
  return msg;
}

export function userInChat(userId, chatId) {
  return chatUsers.some((cu) => cu.chatId === chatId && cu.userId === userId);
}

export function getChatParticipants(chatId) {
  return chatUsers
    .filter((cu) => cu.chatId === chatId)
    .map((cu) => getUserById(cu.userId))
    .filter(Boolean);
}
