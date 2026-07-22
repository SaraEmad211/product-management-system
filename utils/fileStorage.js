import fs from 'fs';
import { paths } from '../config/index.js';

export function loadUsers() {
    if (!fs.existsSync(paths.usersFile)) {
        fs.writeFileSync(paths.usersFile, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(paths.usersFile, 'utf-8'));
}

export function saveUsers(users) {
    fs.writeFileSync(paths.usersFile, JSON.stringify(users, null, 2));
}

export function loadProducts() {
    if (!fs.existsSync(paths.productsFile)) {
        fs.writeFileSync(paths.productsFile, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(paths.productsFile, 'utf-8'));
}

export function saveProducts(products) {
    fs.writeFileSync(paths.productsFile, JSON.stringify(products, null, 2));
}
