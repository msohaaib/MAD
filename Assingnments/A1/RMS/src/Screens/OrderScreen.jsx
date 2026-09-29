import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { AppContext } from '../context/AppContext';

export default function OrderScreen({ route }) {
  const { menu, orders, setOrders, tables } = useContext(AppContext);
  const role = route.params?.role || 'guest';

  const [tableNo, setTableNo] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  // Add a new order
  const addOrder = () => {
    if (!tableNo.trim()) {
      Alert.alert('Error', 'Please enter table number');
      return;
    }

    const table = tables.find(t => t.id === Number(tableNo));
    if (!table) {
      Alert.alert('Error', 'Table does not exist');
      return;
    }

    if (selectedItems.length === 0) {
      Alert.alert('Error', 'Please select at least one item');
      return;
    }

    const newOrder = {
      id: Date.now(),
      tableNo: Number(tableNo),
      items: selectedItems,
    };

    setOrders([...orders, newOrder]);
    setTableNo('');
    setSelectedItems([]);
    Alert.alert('Success', 'Order added');
  };

  // Delete an order
  const deleteOrder = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this order?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => setOrders(orders.filter(o => o.id !== id)),
        },
      ],
    );
  };

  // Toggle menu selection
  const toggleItem = item => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemText}>Table {item.tableNo}</Text>
      <Text>Items: {item.items.map(i => i.name).join(', ')}</Text>
      {role === 'admin' && (
        <Button title="Delete" onPress={() => deleteOrder(item.id)} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>

      {orders.length === 0 && <Text>No orders yet</Text>}

      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderOrder}
      />

      {role === 'admin' && (
        <View style={styles.addContainer}>
          <TextInput
            style={styles.input}
            placeholder="Table Number"
            keyboardType="numeric"
            value={tableNo}
            onChangeText={setTableNo}
          />

          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
            Select Menu Items:
          </Text>
          {menu.map(item => (
            <View key={item.id} style={styles.menuItem}>
              <Text>
                {item.name} - ${item.price}
              </Text>
              <Button
                title={
                  selectedItems.some(i => i.id === item.id) ? 'Remove' : 'Add'
                }
                onPress={() => toggleItem(item)}
              />
            </View>
          ))}

          <Button title="Add Order" onPress={addOrder} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 },
  card: { padding: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5 },
  itemText: { fontWeight: 'bold' },
  addContainer: { marginTop: 20 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
});
