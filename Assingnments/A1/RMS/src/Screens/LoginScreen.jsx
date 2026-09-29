import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'admin' && password === '1234') {
      navigation.navigate('Admin', { role: 'admin' });
    } else {
      alert('Invalid Admin Credentials');
    }
  };

  // Guest button
  <Button
    title="Continue as Guest"
    onPress={() => navigation.navigate('Guest', { role: 'guest' })}
  />;

  return (
    <View>
      <Text>Admin Login</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
      <Button
        title="Continue as Guest"
        onPress={() => navigation.navigate('Guest')}
      />
    </View>
  );
}
