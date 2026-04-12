import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import ProductScreen from './src/screens/productList';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ProductScreen />
    </SafeAreaView>
  );
};

export default App;
