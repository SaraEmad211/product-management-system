# Product Management System - Project Documentation

## Overview

This repository implements a Product Management System using Node.js and Express for the backend, plus static HTML/CSS/JavaScript for the frontend. The application supports user registration, login, JWT-based authentication, and CRUD operations for products with data persisted in JSON files.

---

## Architecture

### Backend
- `server.js` - Application entry point. Configures middleware and routes, then starts the Express server.
- `config/index.js` - Application configuration including the server port and file path constants.
- `middleware/index.js` - Configures global middleware for JSON parsing and static file serving.
- `middleware/verifyToken.js` - JWT validation middleware for protected routes.
- `routes/` - Express routers that register all API and page routes.
- `controllers/` - Route handlers implementing authentication, product management, page serving, and token verification.
- `utils/` - Utility modules for API response formatting and JSON file storage.

### Frontend
- `public/pages/auth.html` - Login and registration page.
- `public/pages/index.html` - Products management page.
- `public/css/auth.css` - Styles for the auth page.
- `public/css/style.css` - Styles for the main product page.
- `public/js/auth.js` - Frontend login/register logic and token handling.
- `public/js/script.js` - Product CRUD and search behavior.

### Data Storage
- `products.json` - Stores product records.
- `users.json` - Stores registered user records.

---

## Project Files and Responsibilities

### `server.js`
- Imports Express and application setup modules.
- Calls `setupMiddleware(app)` and `registerRoutes(app)`.
- Starts the server on the configured port.

### `config/index.js`
- Loads environment variables.
- Computes root and public directory paths.
- Exports `port` and `paths` values used throughout the app.

### `middleware/index.js`
- Uses `express.json()` to parse JSON request bodies.
- Serves static frontend assets from `public/`.

### `middleware/verifyToken.js`
- Reads the `Authorization` header.
- Verifies JWT using `process.env.JWT_SECRET`.
- Attaches decoded user payload to `req.user`.
- Returns `401 Unauthorized` on missing or invalid token.

### `routes/index.js`
- Mounts `authRoutes`, `productRoutes`, `pageRoutes`, and `verifyRoutes`.

### `routes/authRoutes.js`
- `POST /register` → `register`
- `POST /login` → `login`

### `routes/productRoutes.js`
- `GET /api/products` → `getProducts`
- `POST /api/products` → `createProduct`
- `PUT /api/products/:id` → `updateProduct`
- `DELETE /api/products/:id` → `deleteProduct`
- `DELETE /api/products` → `deleteAllProducts`
- All product routes are protected by `verifyToken`.

### `routes/verifyRoutes.js`
- `GET /verify` → `verify`
- Protected by `verifyToken`.

### `routes/pageRoutes.js`
- `GET /` → serves `auth.html`
- `GET /products` → serves `index.html`

### `controllers/authController.js`
- `register(req, res)`
  - Validates email and password.
  - Ensures unique email.
  - Requires strong password rules.
  - Hashes password with bcrypt.
  - Saves user to `users.json`.
  - Returns a success message.
- `login(req, res)`
  - Validates credentials.
  - Finds user by email.
  - Verifies password with bcrypt.
  - Generates a JWT token valid for 1 hour.
  - Returns token and success message.

### `controllers/productController.js`
- `getProducts(req, res)` - Returns all products.
- `createProduct(req, res)` - Creates a product with UUID and timestamps.
- `updateProduct(req, res)` - Updates product fields and `updatedAt` timestamp.
- `deleteProduct(req, res)` - Deletes a product by `id`.
- `deleteAllProducts(req, res)` - Clears all products.

### `controllers/verifyController.js`
- `verify(req, res)` - Returns authorized status and decoded user info.

### `controllers/pageController.js`
- `serveAuthPage(req, res)` - Sends the authentication page.
- `serveProductsPage(req, res)` - Sends the products page.

### `utils/apiResponse.js`
- `sendSuccess(res, data, statusCode)` - Standard success JSON response.
- `sendError(res, message, statusCode)` - Standard error JSON response.

### `utils/fileStorage.js`
- `loadUsers()` / `saveUsers(users)` - Read/write `users.json`.
- `loadProducts()` / `saveProducts(products)` - Read/write `products.json`.
- Normalizes product records by adding missing `id`, `createdAt`, or `updatedAt` values.

---

## API Reference

### Authentication

#### POST /register
- Body: `{ email, password }`
- Response: success message or error if validation fails.

#### POST /login
- Body: `{ email, password }`
- Response: `{ success: true, data: { message, token } }`

#### GET /verify
- Header: `Authorization: Bearer <token>`
- Response: `{ success: true, data: { message: 'Authorized', user } }`

### Products (JWT-protected)

#### GET /api/products
- Response: list of products.

#### POST /api/products
- Body: product object
- Response: created product.

#### PUT /api/products/:id
- Body: updated product object
- Response: updated product.

#### DELETE /api/products/:id
- Response: deletion confirmation.

#### DELETE /api/products
- Response: confirmation of all products deleted.

---

## Frontend Behavior

### Authentication
- `public/js/auth.js` handles register/login requests.
- JWT tokens are stored in browser local storage after login.
- Authenticated access is enforced by client-side route behavior and server-side JWT verification.

### Product Management
- `public/js/script.js` handles fetching, creating, updating, deleting, and searching products.
- The app uses the token from local storage for API requests.

---

## Setup Instructions

1. Install dependencies

```bash
npm install
```

2. Create `.env` file with a JWT secret

```bash
JWT_SECRET=your_secret_here
```

3. Start server

```bash
npm start
```

4. Open browser

```text
http://localhost:3000
```

---

## Notes and Recommendations

- Ensure `JWT_SECRET` is set before starting the server.
- The app uses JSON files for persistence; for production, replace with a real database.
- Password rules enforce strong credentials and prevent password inclusion of email fragments.
- Static assets are served from `public/`, and page routes return HTML files.
- All product endpoints require a valid JWT.

---

## Improvements

- Add logout endpoint and remove token on client side.
- Harden server-side validation for product fields.
- Add request schema validation with a library like `Joi`.
- Move data storage to MongoDB, PostgreSQL, or another DB engine.
- Add unit/integration tests for routes and controllers.
