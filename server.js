import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

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
        const decoded = jwt.verify(token, 'my-secret-key');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
}
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email and password are required!');
        }

        const users = loadUsers();

        const findUser = users.find((data) => email === data.email);
        if (findUser) {
            return res.status(400).send('Email already exists!');
        }

        const hashedPass = await bcrypt.hash(password, 10);
        users.push({ email, password: hashedPass });
        saveUsers(users);

        res.status(201).send('Registered successfully!');
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email and password are required!');
        }

        const users = loadUsers();

        const findUser = users.find((data) => email === data.email);
        if (!findUser) {
            return res.status(400).send('Wrong Email or Password!');
        }

        const passMatch = await bcrypt.compare(password, findUser.password);
        if (!passMatch) {
            return res.status(400).send('Wrong Email or Password!');
        }

        const token = jwt.sign(
            { email: findUser.email , role: 'user'},
            'my-secret-key',
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