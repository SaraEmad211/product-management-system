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
    const fallbackTimestamp = new Date().toISOString();

    const normalized = products.map((product) => {
        const normalizedProduct = { ...product };
        let changed = false;

        if (!normalizedProduct.id) {
            normalizedProduct.id = randomUUID();
            changed = true;
        }
        if (!normalizedProduct.createdAt) {
            normalizedProduct.createdAt = fallbackTimestamp;
            changed = true;
        }
        if (!normalizedProduct.updatedAt) {
            normalizedProduct.updatedAt = normalizedProduct.createdAt;
            changed = true;
        }

        if (changed) {
            migrated = true;
        }

        return normalizedProduct;
    });

    if (migrated) {
        saveProducts(normalized);
    }

    return normalized;
}

export function saveProducts(products) {
    fs.writeFileSync(paths.productsFile, JSON.stringify(products, null, 2));
}
