import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

export const port = 3000;

export const paths = {
    root: rootDir,
    public: path.join(rootDir, 'public'),
    productsFile: path.join(rootDir, 'products.json'),
    usersFile: path.join(rootDir, 'users.json'),
};
