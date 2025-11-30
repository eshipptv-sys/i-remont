import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { env } from './config/env.js';

export const createApp = () => {
  const app = express();
  app.use(express.json({ limit: '5mb' }));
  app.use(cors({ origin: env.frontendUrl, credentials: true }));
  app.use(helmet());
  app.use(morgan('dev'));

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api', publicRoutes);
  app.use('/api/admin', adminRoutes);

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  });

  return app;
};
