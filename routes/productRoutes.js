import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    getProducts,
    createProduct,
    deleteProduct,
    deleteAllProducts,
    updateProduct,
} from '../controllers/productController.js';

const router = Router();

router.get('/api/products', verifyToken, getProducts);
router.post('/api/products', verifyToken, createProduct);
router.delete('/api/products/:id', verifyToken, deleteProduct);
router.delete('/api/products', verifyToken, deleteAllProducts);
router.put('/api/products/:id', verifyToken, updateProduct);

export default router;
