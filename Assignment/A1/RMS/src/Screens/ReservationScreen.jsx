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

export default function ReservationScreen({ route }) {
  const { tables, reservations, setReservations, setTables, menu } =
    useContext(AppContext);
  const role = route.params?.role || 'guest';

  const [customerName, setCustomerName] = useState('');
  const [tableNo, setTableNo] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleMenuItem = item => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Admin reservation
  const addReservationAdmin = () => {
    if (!customerName.trim() || !tableNo.trim()) {
      Alert.alert('Error', 'Enter customer name and table number');
      return;
    }
    const table = tables.find(t => t.id === Number(tableNo));
    if (!table) return Alert.alert('Table not found');
    if (!table.available) return Alert.alert('Table is already booked');

    const newReservation = {
      id: Date.now(),
      tableNo: Number(tableNo),
      customerName,
      items: selectedItems,
    };

    setReservations([...reservations, newReservation]);
    setCustomerName('');
    setTableNo('');
    setSelectedItems([]);
    Alert.alert('Success', 'Reservation added!');
  };

  // Guest reservation
  const addReservationGuest = () => {
    if (!customerName.trim() || !tableNo.trim()) {
      return Alert.alert('Enter name and table number');
    }
    const table = tables.find(t => t.id === Number(tableNo));
    if (!table || !table.available) return Alert.alert('Table not available');

    const newReservation = {
      id: Date.now(),
      tableNo: Number(tableNo),
      customerName,
      items: [],
    };

    setReservations([...reservations, newReservation]);

    // mark table as booked
    setTables(
      tables.map(t => (t.id === table.id ? { ...t, available: false } : t)),
    );

    setCustomerName('');
    setTableNo('');
    Alert.alert(`Table ${table.id} reserved successfully!`);
  };

  const deleteReservation = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this reservation?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => setReservations(reservations.filter(r => r.id !== id)),
        },
      ],
    );
  };

  const renderReservation = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemText}>
        Table {item.tableNo} - {item.customerName}
      </Text>
      <Text>Items: {item.items.map(i => i.name).join(', ') || 'None'}</Text>
      {role === 'admin' && (
        <Button title="Delete" onPress={() => deleteReservation(item.id)} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservations</Text>

      <FlatList
        data={reservations}
        keyExtractor={item => item.id.toString()}
        renderItem={renderReservation}
        ListEmptyComponent={<Text>No reservations yet</Text>}
      />

      {/* Admin view */}
      {role === 'admin' && (
        <View style={styles.addContainer}>
          <TextInput
            style={styles.input}
            placeholder="Customer Name"
            value={customerName}
            onChangeText={setCustomerName}
          />
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
                onPress={() => toggleMenuItem(item)}
              />
            </View>
          ))}
          <Button title="Add Reservation" onPress={addReservationAdmin} />
        </View>
      )}

      {/* Guest view */}
      {role === 'guest' && (
        <View style={styles.addContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={customerName}
            onChangeText={setCustomerName}
          />
          <Text style={{ marginBottom: 5 }}>
            Select Table from available tables below:
          </Text>
          {tables
            .filter(t => t.available)
            .map(table => (
              <Button
                key={table.id}
                title={`Table ${table.id} - Seats: ${table.seats}`}
                onPress={() => setTableNo(table.id.toString())}
                color={tableNo == table.id ? 'green' : undefined}
              />
            ))}
          <Button title="Reserve Table" onPress={addReservationGuest} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, marginBottom: 10, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 },
  card: { padding: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5 },
  itemText: { fontSize: 16, fontWeight: 'bold' },
  addContainer: { marginTop: 20 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3,
  },
});
