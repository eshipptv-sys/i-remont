import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: parseInt(process.env.PORT_BACKEND || '4000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
};

if (!env.databaseUrl) {
  console.warn('DATABASE_URL is not set. Prisma may fail to connect.');
}
