import { randomUUID } from 'crypto';
import { loadProducts, saveProducts } from '../utils/fileStorage.js';

export function getProducts(req, res) {
    const products = loadProducts();
    res.json(products);
}

export function createProduct(req, res) {
    const products = loadProducts();
    const product = { id: randomUUID(), ...req.body };

    products.push(product);
    saveProducts(products);

    res.status(201).json(product);
}

export function deleteProduct(req, res) {
    const products = loadProducts();
    const id = req.params.id;
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products.splice(index, 1);
    saveProducts(products);

    res.json({ message: 'Deleted' });
}

export function deleteAllProducts(req, res) {
    saveProducts([]);
    res.json({ message: 'All products deleted' });
}

export function updateProduct(req, res) {
    const products = loadProducts();
    const id = req.params.id;
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products[index] = { ...req.body, id };
    saveProducts(products);

    res.json(products[index]);
}
