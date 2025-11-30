import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { productController } from '../controllers/productController.js';

const router = Router();

router.get('/products', productController.list);
router.get('/products/:slug', productController.getOne);

router.get('/categories', async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  res.json(categories);
});

router.get('/search', productController.list);

export default router;
