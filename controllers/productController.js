import { loadProducts, saveProducts } from '../utils/fileStorage.js';

export function getProducts(req, res) {
    const products = loadProducts();
    res.json(products);
}

export function createProduct(req, res) {
    const products = loadProducts();
    const product = req.body;

    products.push(product);
    saveProducts(products);

    res.status(201).json(product);
}

export function deleteProduct(req, res) {
    let products = loadProducts();
    const id = Number(req.params.id);

    products.splice(id, 1);
    saveProducts(products);

    res.json({ message: 'Deleted' });
}

export function deleteAllProducts(req, res) {
    saveProducts([]);
    res.json({ message: 'All products deleted' });
}

export function updateProduct(req, res) {
    let products = loadProducts();
    const id = Number(req.params.id);

    products[id] = req.body;
    saveProducts(products);

    res.json(products[id]);
}
