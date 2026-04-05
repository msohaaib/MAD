import React from 'react';
import { View, Text, FlatList } from 'react-native';

const menu = [
  { id: '1', name: 'Pizza', price: '$10' },
  { id: '2', name: 'Burger', price: '$8' },
];

const MenuScreen = () => {
  return (
    <FlatList
      data={menu}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>
            {item.name} - {item.price}
          </Text>
        </View>
      )}
    />
  );
};

export default MenuScreen;
