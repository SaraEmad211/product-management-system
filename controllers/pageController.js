import path from 'path';
import { paths } from '../config/index.js';

export function serveAuthPage(req, res) {
    res.sendFile(path.join(paths.public, 'pages', 'auth.html'));
}

export function serveProductsPage(req, res) {
    res.sendFile(path.join(paths.public, 'pages', 'index.html'));
}
