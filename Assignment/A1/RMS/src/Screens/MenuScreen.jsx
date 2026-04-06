import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { AppContext } from '../context/AppContext';

export default function MenuScreen({ route }) {
  const { menu, orders, setOrders } = useContext(AppContext);
  const role = route.params?.role || 'guest';

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableNo, setTableNo] = useState('');

  // Admin: Add new menu item
  const addItem = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Error', 'Please enter both name and price');
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      price: Number(price),
    };

    setMenu([...menu, newItem]);
    setName('');
    setPrice('');
  };

  // Admin: Delete menu item
  const deleteItem = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => setMenu(menu.filter(i => i.id !== id)),
        },
      ],
    );
  };

  // Guest: Select or remove menu item
  const toggleItem = item => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Guest: Place order
  const placeOrder = () => {
    if (!tableNo.trim()) {
      Alert.alert('Error', 'Enter your table number');
      return;
    }
    if (selectedItems.length === 0) {
      Alert.alert('Error', 'Select at least one item');
      return;
    }

    const newOrder = {
      id: Date.now(),
      tableNo: Number(tableNo),
      items: selectedItems,
    };

    setOrders([...orders, newOrder]);
    setSelectedItems([]);
    setTableNo('');
    Alert.alert('Success', 'Order placed!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemText}>
        {item.name} - ${item.price}
      </Text>

      {role === 'admin' && (
        <Button title="Delete" onPress={() => deleteItem(item.id)} />
      )}

      {role === 'guest' && (
        <Button
          title={selectedItems.some(i => i.id === item.id) ? 'Remove' : 'Add'}
          onPress={() => toggleItem(item)}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      {menu.length === 0 && <Text>No items yet</Text>}

      <FlatList
        data={menu}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />

      {role === 'admin' && (
        <View style={styles.addContainer}>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <Button title="Add Item" onPress={addItem} />
        </View>
      )}

      {role === 'guest' && (
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Table Number"
            keyboardType="numeric"
            value={tableNo}
            onChangeText={setTableNo}
          />
          <Button title="Place Order" onPress={placeOrder} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, marginBottom: 10, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 },
  card: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: { fontSize: 16 },
  addContainer: { marginTop: 20 },
});
