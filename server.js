import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/src', express.static(path.join(__dirname, 'src')));


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

        res.status(200).send('Logged in successfully!');
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});