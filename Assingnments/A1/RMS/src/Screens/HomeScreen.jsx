import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to Restaurant App 🍽️</Text>

      <Button title="View Menu" onPress={() => navigation.navigate('Menu')} />
      <Button
        title="Book Table"
        onPress={() => navigation.navigate('Booking')}
      />
    </View>
  );
};

export default HomeScreen;
