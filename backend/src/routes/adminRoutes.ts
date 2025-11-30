import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { productController } from '../controllers/productController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post('/auth/login', authController.login);

router.use(authMiddleware);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.remove);
router.patch('/products/:id/availability', productController.setAvailability);

export default router;
