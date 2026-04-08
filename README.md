# 🛒 Product Management System (CRUDS)

A full-stack **Product Management Web App** built with vanilla JavaScript, HTML, CSS on the frontend — and Node.js + Express on the backend — featuring secure authentication, complete CRUD operations, real-time search, and persistent data storage.

---

## ✨ Features

- 🔐 **Authentication** — Secure Register & Login with bcrypt password hashing
- ➕ **Create** — Add products with title, price, taxes, ads, discount, count, and category
- 📖 **Read** — Display all products in a dynamic table
- ✏️ **Update** — Edit existing product data inline
- 🗑️ **Delete** — Remove a single product or delete all at once
- 🔢 **Auto Total Calculation** — Real-time price calculation as you type
- 🔍 **Search** — Filter products by title or category instantly
- 💾 **Data Persistence** — Products saved in `localStorage`, users saved in `users.json`
- 📦 **Bulk Insert** — Add multiple copies of a product using the count field

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Backend | Node.js, Express.js |
| Auth Security | bcrypt (password hashing) |
| Data Storage | localStorage (products), JSON file (users) |
| API | REST API (Fetch API on client side) |

---

## 📁 Project Structure

```
project/
│
├── public/
│   ├── index.html        # Main CRUD dashboard
│   └── auth.html         # Login / Register page
│
├── src/
│   ├── script.js         # CRUD logic, search, localStorage
│   └── auth.js           # Fetch API calls for login/register
│
├── styles/
│   ├── style.css         # Dashboard styles
│   └── auth.css          # Auth page styles
│
├── users.json            # Auto-generated — stores registered users
├── server.js             # Express server (auth endpoints)
└── package.json
```

---

## ⚙️ Setup & Run

### 1. Install dependencies

```bash
npm install express bcrypt
```

### 2. Run the server

```bash
node server.js
```

### 3. Open the app

```
http://localhost:3000/auth.html
```

> `users.json` is created automatically on first register — no setup needed.

---

## 🔐 How Authentication Works

1. User registers → password is **hashed with bcrypt** and saved to `users.json`
2. User logs in → password is **compared** against the hash
3. On success → `isLoggedIn` flag is set in `localStorage`
4. `index.html` checks this flag on load — redirects to login if not authenticated

---

## 🔮 Future Improvements

- [ ] Add JWT tokens for stateless, secure sessions
- [ ] Replace JSON file with a real database (MongoDB / PostgreSQL)
- [ ] Add logout button
- [ ] Make UI fully responsive for mobile
- [ ] Add server-side input validation with detailed error messages
