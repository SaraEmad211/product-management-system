import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { verify } from '../controllers/verifyController.js';

const router = Router();

router.get('/verify', verifyToken, verify);

export default router;
