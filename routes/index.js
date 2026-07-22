import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import pageRoutes from './pageRoutes.js';
import verifyRoutes from './verifyRoutes.js';

export function registerRoutes(app) {
    app.use(authRoutes);
    app.use(productRoutes);
    app.use(pageRoutes);
    app.use(verifyRoutes);
}
