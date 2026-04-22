# 📱 Expense Tracker App

A simple **Expense Tracker Dashboard** built with **React Native**, **Node.js (Express)**, and **MySQL**.
This app displays transactions and calculates total income, expenses, and balance.

---

## 🚀 Features

- View all transactions (amount, category, date)
- Calculate:

  - Total Income
  - Total Expenses
  - Remaining Balance

- Data stored in MySQL database
- Simple Node.js API (`server.js`) for data fetching

---

## 🏗️ Tech Stack

- **Frontend:** React Native
- **Backend:** Node.js (Express)
- **Database:** MySQL

---

## 📁 Project Structure

```
project/
│
├── App.tsx
├── Dashboard.tsx
├── server.js
├── package.json
├── setup.sql
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

`git clone git clone https://github.com/msohaaib/MAD.git`

`cd /Assignments/A3/ExpenseTracker`

---

### 2. Setup MySQL Database

`mysql -u root < setup.sql `

---

### 3. Setup Backend (server.js)

Install dependencies:

```
npm install express mysql2 cors
```

Run the server:

```
node server.js
```

Server will run on:

```
http://localhost:3000
```

---

### 4. Setup React Native App

Install dependencies:

```
npm install
npm install axios
```

---

### 5. Configure API URL

In `Dashboard.tsx`, update API URL:

- **Android Emulator:**

```
http://10.0.2.2:3000/transactions
```

- **Real Device:**

```
http://YOUR_IP:3000/transactions
```

---

### 6. Run the App

```
npx react-native run-android
```

---

## 📊 How It Works

- React Native fetches transactions from the Node.js API
- Data is retrieved from MySQL database
- The app uses JavaScript `reduce()` method to calculate:

  - Total Income
  - Total Expenses
  - Balance

---

## 🧮 Example Calculation

```js
const summary = transactions.reduce(
  (acc, item) => {
    if (item.type === 'income') {
      acc.income += Number(item.amount);
    } else {
      acc.expense += Number(item.amount);
    }
    acc.balance = acc.income - acc.expense;
    return acc;
  },
  { income: 0, expense: 0, balance: 0 },
);
```

---
