import { Router } from 'express';
import { serveAuthPage, serveProductsPage } from '../controllers/pageController.js';

const router = Router();

router.get('/', serveAuthPage);
router.get('/products', serveProductsPage);

export default router;
