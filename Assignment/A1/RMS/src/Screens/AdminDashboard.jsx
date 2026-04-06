import React from 'react';
import { View, Button } from 'react-native';

export default function AdminDashboard({ navigation }) {
  return (
    <View>
      <Button
        title="Manage Menu"
        onPress={() => navigation.navigate('Menu', { role: 'admin' })}
      />
      <Button
        title="Manage Tables"
        onPress={() => navigation.navigate('Tables', { role: 'admin' })}
      />
      <Button
        title="Manage Reservations"
        onPress={() => navigation.navigate('Reservations', { role: 'admin' })}
      />
      <Button
        title="Manage Orders"
        onPress={() => navigation.navigate('Orders', { role: 'admin' })}
      />
    </View>
  );
}
