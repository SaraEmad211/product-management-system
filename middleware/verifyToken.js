import jwt from 'jsonwebtoken';
import { sendError } from '../utils/apiResponse.js';

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return sendError(res, 'Unauthorized', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return sendError(res, 'Invalid token', 401);
    }
}
