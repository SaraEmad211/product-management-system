import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loadUsers, saveUsers } from '../utils/fileStorage.js';

export async function register(req, res) {
    try {
        const { email, password } = req.body;
        const cleanEmail = email?.trim();
        const cleanPassword = password?.trim();
        if (!email || !password) {
            return res.status(400).send('Email and password are required!');
        }

        const users = loadUsers();

        const findUser = users.find(
            user => user.email.toLowerCase() === cleanEmail.toLowerCase()
        );
        if (findUser) {
            return res.status(400).send('Email already exists!');
        }
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(cleanPassword)) {
            return res.status(400).send(
                'Weak password. Use at least 8 chars with uppercase, lowercase, number, and special char.'
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
            return res.status(400).send(
                'Password should not contain parts of your email.'
            );
        }

        const hashedPass = await bcrypt.hash(cleanPassword, 10);
        users.push({ email: cleanEmail, password: hashedPass });
        saveUsers(users);

        res.status(201).send('Registered successfully!');
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const cleanEmail = email?.trim();
        const cleanPassword = password?.trim();
        if (!email || !password) {
            return res.status(400).send('Email and password are required!');
        }

        const users = loadUsers();

        const findUser = users.find(
            user => user.email.toLowerCase() === cleanEmail.toLowerCase()
        );
        if (!findUser) {
            return res.status(400).send('Wrong Email or Password!');
        }

        const passMatch = await bcrypt.compare(cleanPassword, findUser.password);
        if (!passMatch) {
            return res.status(400).send('Wrong Email or Password!');
        }

        const token = jwt.sign(
            { email: findUser.email, role: 'user' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Logged in successfully!',
            token
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
