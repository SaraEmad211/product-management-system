import fs from 'fs';
import { randomUUID } from 'crypto';
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
    const products = JSON.parse(fs.readFileSync(paths.productsFile, 'utf-8'));
    let migrated = false;

    const normalized = products.map((product) => {
        if (product.id) {
            return product;
        }
        migrated = true;
        return { id: randomUUID(), ...product };
    });

    if (migrated) {
        saveProducts(normalized);
    }

    return normalized;
}

export function saveProducts(products) {
    fs.writeFileSync(paths.productsFile, JSON.stringify(products, null, 2));
}
