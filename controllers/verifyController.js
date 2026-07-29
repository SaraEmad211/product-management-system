import { sendSuccess } from '../utils/apiResponse.js';

export function verify(req, res) {
    sendSuccess(res, {
        message: 'Authorized',
        user: req.user,
    });
}
