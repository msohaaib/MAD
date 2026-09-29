# Restaurant Management App (React Native)

## Overview

This is a **React Native** app for managing a restaurant, supporting both **admin** and **guest** users.

- **Admin users** can manage menu items, tables, reservations, and orders.
- **Guest users** can view the menu, see available tables, place orders, and make reservations.

The app uses **React Context** for state management and does not require a backend (all data is stored in memory).

---

## Features

### 1\. Admin Features

- **Login / Signup** (hardcoded credentials)
- **Menu Management**
  - Add new menu items (name + price)
  - Delete existing menu items
- **Table Management**
  - Add new tables (table number + seats)
  - Delete tables
- **Reservation Management**
  - Add reservations (select table, customer name, menu items)
  - Delete reservations
- **Order Management**
  - Add orders for specific tables with selected menu items

### 2\. Guest Features

- **View Menu**
  - See all menu items
  - Select items and place order directly
- **View Available Tables**
  - See only available tables
  - Select table to make reservation
- **Make Reservation**
  - Reserve table by selecting available table and entering name
  - Reserved tables become unavailable

---

## Screens

1.  **LoginScreen** – Admin login
2.  **SignupScreen** – Admin signup
3.  **GuestHomeScreen** – Guest options: View Menu, View Tables, Make Reservation, Place Order
4.  **MenuScreen** – Admin: add/delete menu items; Guest: select items and place order
5.  **TableScreen** – Admin: add/delete tables; Guest: view available tables
6.  **ReservationScreen** – Admin: full reservation management; Guest: reserve available tables
7.  **OrderScreen** – Admin: manage orders; Guest: view placed orders

---

## Installation

1.  **Clone the repository**

`git clone https://github.com/msohaaib/MAD.git`

**Navigate to Project Folder**

`cd Assignment/A1/RMS`

2.  **Install dependencies**

`npm install`

or

`yarn install`

3.  **Run the app**

`npx react-native run-android`  
or  
`npx react-native run-ios`

---

## Project Structure

```
RestaurantManagementApp
│
├── /src
|    ├── context/
│        └── AppContext.js
|    ├── data/
│    |   ├── MenuData.js
│    |  └── TableData.js
|    ├── Navigations/
│    |   └── AppNavigator.js
|    ├── Screens/
│       ├── AdminDashboard.jsx
│       ├── GuestHomeScreen.jsx
│       ├── HomeScreen.jsx
│       ├── LoginScreen.jsx
│       ├── MenuScreen.jsx
│       ├── OrderScreen.jsx
│       ├── ReservationScreen.jsx
│       ├── SignupScreen.jsx
│       └── TableScreen.jsx
├── App.js
└── package.json
```

---

## Admin Credentials

- **Email:** `admin`
- **Password:** `1234`

> These are hardcoded for demo purposes. You can change them in `LoginScreen.jsx` and `SignupScreen.jsx`.

---

## Usage

### Admin

1.  Login using admin credentials
2.  Add menu items in **Menu Screen**
3.  Add tables in **Table Screen**
4.  Manage reservations in **Reservation Screen**
5.  Manage orders in **Order Screen**

### Guest

1.  Click **Continue as Guest** from login screen
2.  View **menu** and place order directly
3.  View **available tables** and make reservations

---

## Notes

- All data is **stored in memory** (React Context).
- Closing the app will **reset data**.
- The project is intended as a **MVP** and can be extended with **backend integration** (Firebase, Node.js, etc.).

---

## Dependencies

- react-native
- react-navigation
- react-native-gesture-handler
- react-native-reanimated
- react-native-screens

---

## Future Improvements

- Persistent storage (SQLite / AsyncStorage / Firebase)
- Real authentication system for admin
- Table availability updates in real-time
- Order status tracking (pending, completed)
- UI improvements with **React Native Paper** or **NativeBase**
