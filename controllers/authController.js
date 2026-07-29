import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loadUsers, saveUsers } from '../utils/fileStorage.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

function requireCredentials(email, password, res) {
    if (!email || !password) {
        sendError(res, 'Email and password are required!', 400);
        return false;
    }
    return true;
}

export async function register(req, res) {
    try {
        const { email, password } = req.body;
        const cleanEmail = email?.trim();
        const cleanPassword = password?.trim();

        if (!requireCredentials(email, password, res)) {
            return;
        }

        const users = loadUsers();

        const findUser = users.find(
            user => user.email.toLowerCase() === cleanEmail.toLowerCase()
        );
        if (findUser) {
            return sendError(res, 'Email already exists!', 409);
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(cleanPassword)) {
            return sendError(
                res,
                'Weak password. Use at least 8 chars with uppercase, lowercase, number, and special char.',
                400
            );
        }

        const emailParts = cleanEmail
            .toLowerCase()
            .split(/[@._-]/)
            .filter(part => part.length >= 3);
        const lowerPassword = cleanPassword.toLowerCase();

        const containsEmailPart = emailParts.some(part =>
            lowerPassword.includes(part)
        );

        if (containsEmailPart) {
            return sendError(
                res,
                'Password should not contain parts of your email.',
                400
            );
        }

        const hashedPass = await bcrypt.hash(cleanPassword, 10);
        users.push({ email: cleanEmail, password: hashedPass });
        saveUsers(users);

        sendSuccess(res, { message: 'Registered successfully!' }, 201);
    } catch (err) {
        sendError(res, err.message, 500);
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const cleanEmail = email?.trim();
        const cleanPassword = password?.trim();

        if (!requireCredentials(email, password, res)) {
            return;
        }

        const users = loadUsers();

        const findUser = users.find(
            user => user.email.toLowerCase() === cleanEmail.toLowerCase()
        );
        if (!findUser) {
            return sendError(res, 'Wrong Email or Password!', 401);
        }

        const passMatch = await bcrypt.compare(cleanPassword, findUser.password);
        if (!passMatch) {
            return sendError(res, 'Wrong Email or Password!', 401);
        }

        const token = jwt.sign(
            { email: findUser.email, role: 'user' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        sendSuccess(res, {
            message: 'Logged in successfully!',
            token,
        });
    } catch (err) {
        sendError(res, err.message, 500);
    }
}
