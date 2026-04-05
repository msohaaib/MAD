import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const BookingScreen = () => {
  const [name, setName] = useState('');

  return (
    <View>
      <Text>Book a Table</Text>

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Button title="Book Now" onPress={() => alert('Table Booked!')} />
    </View>
  );
};

export default BookingScreen;
