import React from 'react';
import { View, Button } from 'react-native';

export default function GuestHome({ navigation, route }) {
  const role = route.params?.role;

  return (
    <View>
      <Button
        title="View Menu"
        onPress={() => navigation.navigate('Menu', { role })}
      />
      <Button
        title="View Tables"
        onPress={() => navigation.navigate('Tables', { role })}
      />
      <Button
        title="Make Reservation"
        onPress={() => navigation.navigate('Reservations', { role })}
      />
      <Button
        title="Order Food"
        onPress={() => navigation.navigate('Orders', { role })}
      />
    </View>
  );
}
