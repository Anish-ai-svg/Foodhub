# FoodHub 🍔

A full-stack food delivery web application built as a college project.

## Tech Stack

- **Frontend**: React + Vite + React Router + Vanilla CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt

## Project Structure

```
FoodHub/
├── frontend/       # React Vite app
└── backend/        # Express API
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Clone / open the project

### 2. Setup Backend

```bash
cd backend
npm install
```

Copy the env file and fill in your values:
```bash
copy .env.example .env
```

Edit `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/foodhub
JWT_SECRET=your_super_secret_key
PORT=5000
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This will:
- Insert 20 food items
- Create an admin user: `admin@foodhub.com` / `admin123`

### 4. Start the Backend

```bash
npm run dev
```

Backend runs on: http://localhost:5000

### 5. Setup Frontend

```bash
cd frontend
npm install
```

Copy the env file:
```bash
copy .env.example .env
```

`.env` already has the correct default value:
```
VITE_API_URL=http://localhost:5000/api
```

### 6. Start the Frontend

```bash
npm run dev
```

Frontend runs on: http://localhost:3000

---

## Default Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@foodhub.com | admin123 |
| Customer | Register a new account | - |

---

## Features

### Customer
- Browse and search food items
- Filter by category
- Add to cart (persists after refresh)
- Adjust quantity, remove items
- Checkout with delivery address
- Cash on Delivery payment
- View order history and details

### Admin
- View dashboard stats
- Add / Edit / Delete food items
- View all orders
- Update order status

## API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/foods           (search, category filter)
GET    /api/foods/:id
POST   /api/foods           (admin)
PUT    /api/foods/:id       (admin)
DELETE /api/foods/:id       (admin)

GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/:foodId
DELETE /api/cart/items/:foodId
DELETE /api/cart

POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PATCH  /api/orders/:id/status  (admin)

POST   /api/contact
GET    /api/contact         (admin)
```
