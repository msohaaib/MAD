# 🍽️ Restaurant Server API

## 📌 Project Overview

This is a simple backend server built using **Node.js** and **Express.js** for a restaurant application. It provides APIs to manage menu items, users, and orders.

The server demonstrates communication between frontend and backend by logging orders in the terminal.

---

## 🚀 Features

- 📋 View all menu items (with images)
- 🔍 Filter menu by category
- 👤 User registration and login
- 📦 Place orders (Order Logger)
- ❤️ Add/remove favorites (optional feature)

---

## 🗂️ Project Structure

    Restaurant-Server/
    │
    ├── server.js
    ├── data/
    │   ├── menu.js
    │   ├── users.js
    │   └── orders.js
    │
    ├── routes/
    │   ├── menuRoutes.js
    │   ├── authRoutes.js
    │   └── orderRoutes.js

---

## ⚙️ Installation & Setup

1.  Clone or download the project
2.  Open terminal in project folder
3.  Initialize project:

    npm init -y

4.  Install dependencies:

    npm install express

5.  Run the server:

    node server.js

---

## 🌐 API Endpoints

### 📋 Menu

- **GET /api/menu**  
  → Get all menu items
- **GET /api/menu/category/:category**  
  → Filter menu by category

---

### 👤 Authentication

- **POST /api/login**  
  → User login
- **POST /api/register**  
  → Register new user

---

### 📦 Orders (Important)

- **POST /api/orders**  
  → Place an order and log it in terminal
- **GET /api/orders/user/:userId**  
  → Get user orders

---

## 🧪 Testing the API

### 🔹 Test in Browser

    http://localhost:3000/api/menu

---

### 🔹 Test POST APIs (Using Postman / Thunder Client)

#### Login Example

    {
      "email": "test@gmail.com",
      "password": "123456"
    }

#### Register Example

    {
      "email": "sohaib@gmail.com",
      "password": "123456"
    }

#### Order Example

    {
      "customerName": "Sohaib",
      "items": [
        {
          "name": "Pizza",
          "quantity": 2,
          "price": 1200
        }
      ],
      "total": 2400,
      "address": "Rawalpindi"
    }

---

## 🎯 Key Requirement (Assignment)

✔ Hardcoded Menu Server  
✔ Image URLs included  
✔ Order Logger (prints in terminal)  
✔ Single backend system

---

## 💡 Notes

- Data is stored in memory (no database)
- Server resets when restarted
- Built for learning and demonstration purposes

---
