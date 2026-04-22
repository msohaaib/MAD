import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Dashboard from './screen/dashboard';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Dashboard />
    </SafeAreaView>
  );
}
