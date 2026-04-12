# E-Commerce Product Details App

A React Native application that displays product list fetched from a local MySQL database.

---

## Features

- Fetch product details from a MySQL backend API
- Display product image, title, price, and description
- Works on Android emulators and real devices

---

## Project Structure

#

```
EcomProdDetail/
├─ android/
├─ ios/
├─ src/
│ ├─ screens/
│  └─ ProductDetails.js
├─ Backend/
|    └─ server.js
├─ App.js
├─ setup.sql
├─ package.json
└─ README.md
```

---

## Requirements

- Node.js >= 18.x
- React Native CLI
- Android Studio (for emulator)
- MySQL Server
- npm or yarn

---

## Installation

1.  Clone the repository:

`git clone https://github.com/msohaaib/MAD.git`

`cd /Assignments/A3/EcomProdDetail`

2.  Install dependencies:

`npm install --legacy-peer-deps`

3.  Install AsyncStorage (compatible version):

`npm install @react-native-async-storage/async-storage@1.15.14 --legacy-peer-deps`

---

## Backend Setup

1.  Setup MySQL database:

Run inside EcomProdDetail folder

`mysql -u root < setup.sql`

2.  Run backend:

`node server.js`

> Make sure your device/emulator is on the same network as your backend.

---

## Run the App

1.  Start Metro bundler:

`npx react-native start`

2.  Run on Android:

`npx react-native run-android`

---

## How It Works

#

1.  Open product details screen
2.  App fetches product from backend
3.  Display product info (image, title, price, description)
