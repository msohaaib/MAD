# E-Commerce Product Details App

A React Native application that displays product details fetched from a local MySQL database and allows users to add products to a cart using AsyncStorage.

---

## Features

- Fetch product details from a MySQL backend API
- Display product image, title, price, and description
- Add products to a local cart using AsyncStorage
- Works on Android emulators and real devices
- Offline cart persistence

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
4.  Tap **Add to Cart** → save in AsyncStorage
5.  Cart persists even after app restart
