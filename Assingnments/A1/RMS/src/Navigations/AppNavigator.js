import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Screens/LoginScreen';
import Signup from '../Screens/SignupScreen';
import GuestHome from '../Screens/GuestHomeScreen';
import AdminDashboard from '../Screens/AdminDashboard';

import MenuScreen from '../Screens/MenuScreen';
import TableScreen from '../Screens/TableScreen';
import ReservationScreen from '../Screens/ReservationScreen';
import OrderScreen from '../Screens/OrderScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Auth */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />

      {/* Main */}
      <Stack.Screen name="Guest" component={GuestHome} />
      <Stack.Screen name="Admin" component={AdminDashboard} />

      {/* Features (IMPORTANT FIX) */}
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Tables" component={TableScreen} />
      <Stack.Screen name="Reservations" component={ReservationScreen} />
      <Stack.Screen name="Orders" component={OrderScreen} />
    </Stack.Navigator>
  );
}
