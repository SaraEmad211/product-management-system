# 🛒 Product Management System (CRUDS)

A full-stack **Product Management Web Application** built with **HTML, CSS, and Vanilla JavaScript** on the frontend, and **Node.js + Express.js** on the backend.

The application includes secure user authentication, complete CRUD operations, real-time search, and persistent storage for products and users.

---

## ✨ Features

* 🔐 **Secure Authentication** — Register & Login with bcrypt password hashing and JWT authentication
* ➕ **Create** — Add products with title, price, taxes, ads, discount, count, and category
* 📖 **Read** — Display all products in a dynamic table
* ✏️ **Update** — Edit product data
* 🗑️ **Delete** — Delete individual products or all products at once
* 🔢 **Auto Total Calculation** — Real-time total price calculation
* 🔍 **Search** — Search products by title or category
* 💾 **Data Persistence — Products and users stored in JSON files
* 📦 **Bulk Insert** — Create multiple product entries using count
* 🛡️ **Authentication Protection** — Protected routes with token verification

---

## 🛠️ Tech Stack

| Layer             | Technology                                 |
| ----------------- | ------------------------------------------ |
| Frontend          | HTML5, CSS3, Vanilla JavaScript (ES6+)     |
| Backend           | Node.js, Express.js                        |
| Authentication    | bcrypt, JWT                                |
| Data Storage      | JSON files (products.json, users.json)     |
| API Communication | Fetch API                                  |

---

## 📁 Project Structure

```bash
project/
│
├── public/
│   ├── css/
│   │   ├── auth.css
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   └── script.js
│   │
│   └── pages/
│       ├── auth.html
│       └── index.html
│
├── server.js
├── package.json
├── package-lock.json
├── products.json
└── users.json

```

---

## ⚙️ Setup & Run

### 1. Clone repository

```bash
git clone https://github.com/SaraEmad211/product-management-system.git
cd product-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start server

```bash
npm start
```

Or:

```bash
node server.js
```

### 4. Open application

```bash
http://localhost:3000
```

> `users.json` is generated automatically after first registration.

---

## 🔐 Authentication Flow

1. User registers → Password is hashed using bcrypt and stored in `users.json`
2. User logs in → Credentials are verified by the server
3. On successful login → Server generates a JWT token
4. Token is stored in browser localStorage
5. Protected pages validate token using `/verify`
6. Invalid or missing tokens redirect users to login page

---

## API Endpoints

### Authentication
- POST /register
- POST /login
- GET /verify

### Products
- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- DELETE /api/products
  
## 🔒 Security Improvements

### Fixed Authentication Bypass Vulnerability

Previously, authentication relied only on client-side localStorage (`isLoggedIn`), which allowed authentication bypass.

#### Fix Applied:

* Removed insecure `isLoggedIn` authentication logic
* Implemented JWT-based authentication
* Added server-side token verification
* Protected authenticated access using `/verify`

---

## 🔮 Future Improvements

* [ ] Replace JSON storage with MongoDB or PostgreSQL
* [ ] Store JWT in HTTP-only cookies
* [ ] Add logout functionality
* [ ] Improve responsive design
* [ ] Add stronger server-side validation
