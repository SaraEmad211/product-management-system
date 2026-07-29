import { randomUUID } from 'crypto';
import { loadProducts, saveProducts } from '../utils/fileStorage.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

function findProductIndex(products, id) {
    return products.findIndex((product) => product.id === id);
}

export function getProducts(req, res) {
    const products = loadProducts();
    sendSuccess(res, products);
}

export function createProduct(req, res) {
    const products = loadProducts();
    const now = new Date().toISOString();
    const product = {
        ...req.body,
        id: randomUUID(),
        createdAt: now,
        updatedAt: now,
    };

    products.push(product);
    saveProducts(products);

    sendSuccess(res, product, 201);
}

export function deleteProduct(req, res) {
    const products = loadProducts();
    const id = req.params.id;
    const index = findProductIndex(products, id);

    if (index === -1) {
        return sendError(res, 'Product not found', 404);
    }

    products.splice(index, 1);
    saveProducts(products);

    sendSuccess(res, { message: 'Deleted' });
}

export function deleteAllProducts(req, res) {
    saveProducts([]);
    sendSuccess(res, { message: 'All products deleted' });
}

export function updateProduct(req, res) {
    const products = loadProducts();
    const id = req.params.id;
    const index = findProductIndex(products, id);

    if (index === -1) {
        return sendError(res, 'Product not found', 404);
    }

    products[index] = {
        ...req.body,
        id,
        createdAt: products[index].createdAt,
        updatedAt: new Date().toISOString(),
    };
    saveProducts(products);

    sendSuccess(res, products[index]);
}
