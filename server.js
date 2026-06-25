import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

const USERS_FILE = path.join(__dirname, 'users.json');

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function loadProducts() {
    if (!fs.existsSync(PRODUCTS_FILE)) {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
}

function saveProducts(products) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
}
app.post('/register', async (req, res) => {
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
        users.push({ email:cleanEmail, password: hashedPass });
        saveUsers(users);

        res.status(201).send('Registered successfully!');
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
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
);        if (!findUser) {
            return res.status(400).send('Wrong Email or Password!');
        }

        const passMatch = await bcrypt.compare(cleanPassword, findUser.password);
        if (!passMatch) {
            return res.status(400).send('Wrong Email or Password!');
        }

        const token = jwt.sign(
            { email: findUser.email , role: 'user'},
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
});




app.get('/api/products', verifyToken, (req, res) => {
    const products = loadProducts();
    res.json(products);
});
app.post('/api/products', verifyToken, (req, res) => {
    const products = loadProducts();
    const product = req.body;

    products.push(product);
    saveProducts(products);

    res.status(201).json(product);
});
app.delete('/api/products/:id', verifyToken, (req, res) => {
    let products = loadProducts();
    const id = Number(req.params.id);

    products.splice(id, 1);
    saveProducts(products);

    res.json({ message: 'Deleted' });
});
app.delete('/api/products', verifyToken, (req, res) => {
    saveProducts([]);
    res.json({ message: 'All products deleted' });
});
app.put('/api/products/:id', verifyToken, (req, res) => {
    let products = loadProducts();
    const id = Number(req.params.id);

    products[id] = req.body;
    saveProducts(products);

    res.json(products[id]);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'auth.html'));
});
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});
app.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'Authorized',
        user: req.user
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});