import { Router } from 'express';
import { getProductBySlug, getProducts } from '../controllers/productsController.js';

const router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

export default router;
