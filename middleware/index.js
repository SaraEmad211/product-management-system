import express from 'express';
import { paths } from '../config/index.js';

export function setupMiddleware(app) {
    app.use(express.json());
    app.use(express.static(paths.public));
}
