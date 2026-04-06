import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function Signup({ navigation }) {
  return (
    <View>
      <Text>Admin Signup</Text>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" secureTextEntry />
      <Button title="Register" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
