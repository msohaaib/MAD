Restaurant Management App
=========================

Overview
--------

This project is a **Restaurant Management App** designed to improve the dining experience by reducing wait times and streamlining table reservations and food ordering through a mobile app.

Concept
-------

The app allows users to:

*   View the menu and daily specials
    
*   Check table availability
    
*   Book tables in advance
    
*   Place food orders via phone app
    

It aims to solve frustrations like long queues and inefficient phone reservations.

User Perspectives
-----------------

### Customer

*   Browse daily specials and full menu
    
*   Book tables and pre-order food for faster service
    

### Manager

*   Digitize table bookings and orders
    
*   Manage reservations efficiently
    
*   Avoid struggles of manual phone-based reservations
    

Features
--------

*   Menu browsing with prices
    
*   Table booking interface
    
*   Simple order placement
    
*   Navigation between app screens
    

# Project Structure

```
src/
├── Components/
│   ├── MenuItem.jsx
│   └── TableCard.jsx
├── Navigations/
│   └── AppNavigator.js
├── Screens/
│   ├── BookingScreen.jsx
│   ├── HomeScreen.jsx
│   ├── MenuScreen.jsx
│   └── OrderScreen.jsx
App.tsx
index.js
```
Installation and Setup
----------------------

1.  Clone the repo
    
2.  Install dependencies ```npm install```
    
3.  Run Metro bundler ```npx react-native start```
    
4.  Run on Android emulator/device ```npx react-native run-android```
    
5.  (macOS only) Run on iOS simulator/device ```npx react-native run-ios```
    

Dependencies
------------

*   react-native
    
*   @react-navigation/native
    
*   react-native-reanimated
    
*   react-native-gesture-handler
    
*   react-native-safe-area-context
    
*   react-native-screens
    
*   @react-navigation/native-stack
    

Deliverables
------------

*   SRS document outlining system requirements
    
*   UML diagrams (use case, activity)
    
*   Minimum Viable Product (MVP) with core features implemented
