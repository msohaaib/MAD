# 💳 Stripe Payment Integration - React Native + Node.js

A complete React Native frontend and Node.js/Express backend integration for secure payments using Stripe.

## ✨ Features

- Modern dark UI payment screen in React Native
- Secure Stripe Payment Intent flow
- Express.js backend with CORS support
- Environment variable configuration

## 📂 Project Structure

```
stripe-payment-app/
├── frontend/
│   └── PaymentScreen.tsx
└── stripe-backend/
├── index.js
├── .env
└── package.json
```

## 🛠 Backend Setup (stripe-backend)

### 1. Install Dependencies

```bash
cd stripe-backend
npm install
touch .env
```

### 2. add these to .env file

```
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxx

PORT=3000
```

### 3. Run Backend

```
node index.js
```

## 📱 Frontend (React Native)

The PaymentScreen is already configured to call http://10.0.2.2:3000/payment-intent
Note:

Use http://10.0.2.2:3000 for Android Emulator
Use your PC's local IP for physical device

🚀 How to Run

### 1. start Backend

```
cd stripe-backend
node index.js
```

#### 2. Run React Native app

```
npm install
npx react-native run-android
# or
npx expo start
```

## 📱 Preview

![alt text](image.png)
